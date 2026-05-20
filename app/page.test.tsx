import { expect, test, describe } from "bun:test";
import { render, screen } from "@testing-library/react";
import LandingPage from "./page";

describe("LandingPage", () => {
  test("renders Hello world", () => {
    render(<LandingPage />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toBe("Hello world");
  });
});
