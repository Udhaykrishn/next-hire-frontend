import {
  afterEach,
  beforeEach,
  describe,
  expect,
  mock,
  spyOn,
  test,
} from "bun:test";
import { apiClient } from "@/lib/api-client";
import { authService } from "./auth.api";

describe("authService.getCurrentUser", () => {
  let originalWindow: typeof window | undefined;

  beforeEach(() => {
    // Save original window object
    originalWindow = globalThis.window;
  });

  afterEach(() => {
    // Restore window and mocks
    globalThis.window = originalWindow as Window & typeof globalThis;
    mock.restore();
  });

  const setWindowPathname = (pathname: string) => {
    globalThis.window = {
      ...globalThis.window,
      location: {
        ...globalThis.window?.location,
        pathname,
      },
    } as Window & typeof globalThis;
  };

  test("happy path: admin user", async () => {
    setWindowPathname("/admin");
    const getSpy = spyOn(apiClient, "get").mockResolvedValue(true as never);

    const result = await authService.getCurrentUser();

    expect(getSpy).toHaveBeenCalledWith("/auth/admin/recruiter/status");
    expect(result).toEqual({
      data: {
        id: "admin",
        email: "admin@nexthire.ai",
        role: "ADMIN",
      },
    });
  });

  test("happy path: recruiter user", async () => {
    setWindowPathname("/recruiter");
    const getSpy = spyOn(apiClient, "get").mockResolvedValue({
      data: { id: "123", name: "Recruiter Bob" },
    } as never);

    const result = await authService.getCurrentUser();

    expect(getSpy).toHaveBeenCalledWith("/recruiter/profile");
    expect(result).toEqual({
      data: {
        id: "123",
        name: "Recruiter Bob",
        role: "RECRUITER",
      },
    });
  });

  test("happy path: default/candidate user", async () => {
    setWindowPathname("/");
    const getSpy = spyOn(apiClient, "get").mockResolvedValue({
      data: { id: "456", name: "Candidate Alice" },
    } as never);

    const result = await authService.getCurrentUser();

    expect(getSpy).toHaveBeenCalledWith("/user/profile");
    expect(result).toEqual({
      data: {
        id: "456",
        name: "Candidate Alice",
        role: "CANDIDATE",
      },
    });
  });

  test("error path: admin API fails", async () => {
    setWindowPathname("/admin");
    spyOn(apiClient, "get").mockRejectedValue(new Error("Admin API Failed"));

    const result = await authService.getCurrentUser();
    expect(result).toBeNull();
  });

  test("error path: recruiter API fails", async () => {
    setWindowPathname("/recruiter");
    spyOn(apiClient, "get").mockRejectedValue(
      new Error("Recruiter API Failed"),
    );

    const result = await authService.getCurrentUser();
    expect(result).toBeNull();
  });

  test("error path: default/candidate API fails, falls back to recruiter", async () => {
    setWindowPathname("/");
    const getSpy = spyOn(apiClient, "get").mockImplementation(async (url) => {
      if (url === "/user/profile") {
        throw new Error("User profile not found");
      }
      if (url === "/recruiter/profile") {
        return { data: { id: "789", name: "Fallback Recruiter" } };
      }
    });

    const result = await authService.getCurrentUser();

    expect(getSpy).toHaveBeenCalledWith("/user/profile");
    expect(getSpy).toHaveBeenCalledWith("/recruiter/profile");
    expect(result).toEqual({
      data: {
        id: "789",
        name: "Fallback Recruiter",
        role: "RECRUITER",
      },
    });
  });

  test("error path: both default and fallback APIs fail", async () => {
    setWindowPathname("/");
    spyOn(apiClient, "get").mockRejectedValue(new Error("API completely down"));

    const result = await authService.getCurrentUser();
    expect(result).toBeNull();
  });

  test("error path: window is undefined", async () => {
    // Temporarily remove window
    const getSpy = spyOn(apiClient, "get").mockResolvedValue({
      data: { id: "999", name: "No Window User" },
    } as never);

    // Some environments define window as non-configurable, but let's cast to undefined for testing
    // To ensure typeof window === "undefined" inside the code, we actually need to bypass or redefine globalThis
    // In bun test without DOM, window is typically undefined anyway. Let's force it:
    // @ts-expect-error
    delete globalThis.window;

    const result = await authService.getCurrentUser();

    expect(getSpy).toHaveBeenCalledWith("/user/profile");
    expect(result).toEqual({
      data: {
        id: "999",
        name: "No Window User",
        role: "CANDIDATE",
      },
    });
  });

  test("error path: window undefined and both APIs fail", async () => {
    spyOn(apiClient, "get").mockRejectedValue(new Error("All APIs Failed"));

    // @ts-expect-error
    delete globalThis.window;

    const result = await authService.getCurrentUser();
    expect(result).toBeNull();
  });
});
