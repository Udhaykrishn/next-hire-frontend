import { describe, expect, test } from "bun:test";
import { cn } from "./utils";

describe("cn", () => {
  test("merges basic classes", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  test("resolves tailwind class conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  test("handles conditional classes", () => {
    expect(cn("px-2", true && "py-1", false && "bg-red-500")).toBe("px-2 py-1");
  });

  test("handles objects", () => {
    expect(cn({ "px-2": true, "py-1": false })).toBe("px-2");
  });

  test("handles arrays", () => {
    expect(cn(["px-2", "py-1"])).toBe("px-2 py-1");
  });

  test("handles null and undefined", () => {
    expect(cn("px-2", null, undefined)).toBe("px-2");
  });

  test("merges tailwind classes properly with complex inputs", () => {
    expect(cn("bg-red-500", { "bg-blue-500": true }, ["text-center"])).toBe("bg-blue-500 text-center");
  });
});
