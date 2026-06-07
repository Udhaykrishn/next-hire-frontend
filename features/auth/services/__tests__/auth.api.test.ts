import { describe, it, expect, mock, spyOn, beforeEach } from "bun:test";
import { authService } from "../auth.api";
import { apiClient } from "@/lib/api-client";

describe("authService.login", () => {
  beforeEach(() => {
    mock.restore();
  });

  it("should test default role (user)", async () => {
    const postSpy = spyOn(apiClient, "post").mockResolvedValue({
      data: {
        user: { id: "1", email: "test@example.com", role: "CANDIDATE" },
        accessToken: "token123",
      },
    });

    const result = await authService.login("test@example.com", "password123");

    expect(postSpy).toHaveBeenCalledWith("/auth/user/login", {
      email: "test@example.com",
      password: "password123",
    });
    expect(result.user.role).toBe("CANDIDATE");
    expect(result.token).toBe("token123");
  });

  it("should test admin role", async () => {
    const postSpy = spyOn(apiClient, "post").mockResolvedValue({
      data: {
        user: { id: "1", email: "admin@example.com", role: "ADMIN" },
        accessToken: "token123",
      },
    });

    const result = await authService.login(
      "admin@example.com",
      "password123",
      "admin",
    );

    expect(postSpy).toHaveBeenCalledWith("/auth/admin/login", {
      email: "admin@example.com",
      password: "password123",
    });
    expect(result.user.role).toBe("ADMIN");
  });

  it("should test recruiter role", async () => {
    const postSpy = spyOn(apiClient, "post").mockResolvedValue({
      data: {
        user: { id: "1", email: "recruiter@example.com", role: "RECRUITER" },
        accessToken: "token123",
      },
    });

    const result = await authService.login(
      "recruiter@example.com",
      "password123",
      "recruiter",
    );

    expect(postSpy).toHaveBeenCalledWith("/auth/recruiter/login", {
      email: "recruiter@example.com",
      password: "password123",
    });
    expect(result.user.role).toBe("RECRUITER");
  });

  it("should return default role fallback if user property is missing in response", async () => {
    const postSpy = spyOn(apiClient, "post").mockResolvedValue({
      data: {
        accessToken: "token123",
      },
    });

    const resultAdmin = await authService.login(
      "admin@example.com",
      "password123",
      "admin",
    );
    expect(resultAdmin.user.role).toBe("ADMIN");
    expect(resultAdmin.user.email).toBe("admin@example.com");
    expect(resultAdmin.user.id).toBe("current");

    const resultRecruiter = await authService.login(
      "recruiter@example.com",
      "password123",
      "recruiter",
    );
    expect(resultRecruiter.user.role).toBe("RECRUITER");

    const resultUser = await authService.login(
      "user@example.com",
      "password123",
      "user",
    );
    expect(resultUser.user.role).toBe("CANDIDATE");
  });
});
