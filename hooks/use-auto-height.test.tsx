import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  mock,
  spyOn,
} from "bun:test";
import { act, render } from "@testing-library/react";
import type * as React from "react";
import { useAutoHeight } from "./use-auto-height";

// Ensure global document exists in the test scope if needed, though GlobalRegistrator handles most
let resizeCallback: ResizeObserverCallback | null = null;
const observeMock = mock();
const disconnectMock = mock();

class MockResizeObserver {
  constructor(cb: ResizeObserverCallback) {
    resizeCallback = cb;
  }
  observe = observeMock;
  disconnect = disconnectMock;
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

const TestComponent = ({
  options = {},
  deps = [],
}: {
  options?: Parameters<typeof useAutoHeight>[1];
  deps?: React.DependencyList;
}) => {
  const { ref, height } = useAutoHeight<HTMLDivElement>(deps, options);
  return (
    <div
      data-testid="parent"
      style={{
        padding: "10px",
        border: "5px solid black",
        boxSizing: "border-box",
      }}
    >
      <div
        ref={ref}
        data-testid="child"
        style={{
          padding: "5px",
          border: "2px solid red",
          boxSizing: "border-box",
        }}
      >
        Height: {height}
      </div>
    </div>
  );
};

describe("useAutoHeight", () => {
  let getBoundingClientRectSpy: Mock<
    typeof Element.prototype.getBoundingClientRect
  >;
  let getComputedStyleSpy: Mock<typeof window.getComputedStyle>;
  let requestAnimationFrameSpy: Mock<typeof window.requestAnimationFrame>;

  beforeEach(() => {
    resizeCallback = null;
    observeMock.mockClear();
    disconnectMock.mockClear();

    getBoundingClientRectSpy = spyOn(
      Element.prototype,
      "getBoundingClientRect",
    ).mockImplementation(function (this: Element) {
      if (this.getAttribute("data-testid") === "child") {
        return { height: 100 } as DOMRect;
      }
      return { height: 0 } as DOMRect;
    });

    getComputedStyleSpy = spyOn(window, "getComputedStyle").mockImplementation(
      (el: Element) => {
        // Because `el` comes from ref, let's look at getAttribute
        if (el.getAttribute("data-testid") === "parent") {
          return {
            paddingTop: "10px",
            paddingBottom: "10px",
            borderTopWidth: "5px",
            borderBottomWidth: "5px",
            boxSizing: "border-box",
          } as CSSStyleDeclaration;
        }
        if (el.getAttribute("data-testid") === "child") {
          return {
            paddingTop: "5px",
            paddingBottom: "5px",
            borderTopWidth: "2px",
            borderBottomWidth: "2px",
            boxSizing: "border-box",
          } as CSSStyleDeclaration;
        }
        return {} as CSSStyleDeclaration;
      },
    );

    requestAnimationFrameSpy = spyOn(
      window,
      "requestAnimationFrame",
    ).mockImplementation((cb: FrameRequestCallback) => {
      cb(performance.now());
      return 1;
    });
  });

  afterEach(() => {
    getBoundingClientRectSpy.mockRestore();
    getComputedStyleSpy.mockRestore();
    requestAnimationFrameSpy.mockRestore();
  });

  it("calculates initial height correctly with default options (includeParentBox: true, includeSelfBox: false)", () => {
    const { getByTestId } = render(
      <TestComponent
        options={{ includeParentBox: true, includeSelfBox: false }}
      />,
    );

    // base (100) + parent extra (10+10 + 5+5 = 30) = 130
    expect(getByTestId("child").textContent).toBe("Height: 130");
  });

  it("calculates initial height correctly with includeParentBox: false, includeSelfBox: false", () => {
    const { getByTestId } = render(
      <TestComponent
        options={{ includeParentBox: false, includeSelfBox: false }}
      />,
    );

    // base (100)
    expect(getByTestId("child").textContent).toBe("Height: 100");
  });

  it("calculates initial height correctly with includeParentBox: false, includeSelfBox: true", () => {
    const { getByTestId } = render(
      <TestComponent
        options={{ includeParentBox: false, includeSelfBox: true }}
      />,
    );

    // base (100) + self extra (5+5 + 2+2 = 14) = 114
    expect(getByTestId("child").textContent).toBe("Height: 114");
  });

  it("calculates initial height correctly with includeParentBox: true, includeSelfBox: true", () => {
    const { getByTestId } = render(
      <TestComponent
        options={{ includeParentBox: true, includeSelfBox: true }}
      />,
    );

    // base (100) + parent extra (30) + self extra (14) = 144
    expect(getByTestId("child").textContent).toBe("Height: 144");
  });

  it("re-calculates height when ResizeObserver triggers", () => {
    const { getByTestId } = render(
      <TestComponent
        options={{ includeParentBox: false, includeSelfBox: false }}
      />,
    );
    expect(getByTestId("child").textContent).toBe("Height: 100");

    act(() => {
      getBoundingClientRectSpy.mockImplementation(function (this: Element) {
        if (this.getAttribute("data-testid") === "child") {
          return { height: 200 } as DOMRect;
        }
        return { height: 0 } as DOMRect;
      });

      if (resizeCallback) {
        resizeCallback([], {} as ResizeObserver);
      }
    });

    expect(getByTestId("child").textContent).toBe("Height: 200");
  });

  it("observes both elements when includeParentBox is true", () => {
    render(
      <TestComponent
        options={{ includeParentBox: true, includeSelfBox: false }}
      />,
    );
    expect(observeMock).toHaveBeenCalledTimes(2);
  });

  it("observes only self element when includeParentBox is false", () => {
    render(
      <TestComponent
        options={{ includeParentBox: false, includeSelfBox: false }}
      />,
    );
    expect(observeMock).toHaveBeenCalledTimes(1);
  });

  it("disconnects ResizeObserver on unmount", () => {
    const { unmount } = render(<TestComponent />);
    expect(disconnectMock).not.toHaveBeenCalled();
    unmount();
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
