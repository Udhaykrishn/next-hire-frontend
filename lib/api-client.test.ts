import { describe, expect, it, mock, beforeEach, afterEach,  } from "bun:test";
import { apiClient } from "./api-client";
import { InternalAxiosRequestConfig, AxiosResponse, AxiosHeaders, AxiosError } from "axios";

describe("apiClient interceptors", () => {
  let originalDocument: any;

  beforeEach(() => {
    originalDocument = global.document;

    global.document = {
      cookie: "XSRF-TOKEN=test-token-123"
    } as any;
  });

  afterEach(() => {
    global.document = originalDocument;
  });

  describe("request interceptor", () => {
    it("adds CSRF token for POST requests", async () => {
      let interceptedConfig: any;
      const adapter = async (config: InternalAxiosRequestConfig) => {
        interceptedConfig = config;
        return { data: { success: true }, status: 200, statusText: "OK", headers: new AxiosHeaders(), config } as AxiosResponse;
      };

      await apiClient.post("/test", {}, { adapter });
      expect(interceptedConfig.headers["X-XSRF-TOKEN"]).toBe("test-token-123");
    });

    it("adds CSRF token for PUT requests", async () => {
      let interceptedConfig: any;
      const adapter = async (config: InternalAxiosRequestConfig) => {
        interceptedConfig = config;
        return { data: { success: true }, status: 200, statusText: "OK", headers: new AxiosHeaders(), config } as AxiosResponse;
      };

      await apiClient.put("/test", {}, { adapter });
      expect(interceptedConfig.headers["X-XSRF-TOKEN"]).toBe("test-token-123");
    });

    it("adds CSRF token for DELETE requests", async () => {
      let interceptedConfig: any;
      const adapter = async (config: InternalAxiosRequestConfig) => {
        interceptedConfig = config;
        return { data: { success: true }, status: 200, statusText: "OK", headers: new AxiosHeaders(), config } as AxiosResponse;
      };

      await apiClient.delete("/test", { adapter });
      expect(interceptedConfig.headers["X-XSRF-TOKEN"]).toBe("test-token-123");
    });

    it("does not add CSRF token for GET requests", async () => {
      let interceptedConfig: any;
      const adapter = async (config: InternalAxiosRequestConfig) => {
        interceptedConfig = config;
        return { data: { success: true }, status: 200, statusText: "OK", headers: new AxiosHeaders(), config } as AxiosResponse;
      };

      await apiClient.get("/test", { adapter });
      expect(interceptedConfig.headers["X-XSRF-TOKEN"]).toBeUndefined();
    });

    it("does not add CSRF token for HEAD requests", async () => {
      let interceptedConfig: any;
      const adapter = async (config: InternalAxiosRequestConfig) => {
        interceptedConfig = config;
        return { data: { success: true }, status: 200, statusText: "OK", headers: new AxiosHeaders(), config } as AxiosResponse;
      };

      await apiClient.head("/test", { adapter });
      expect(interceptedConfig.headers["X-XSRF-TOKEN"]).toBeUndefined();
    });

    it("does not add CSRF token for OPTIONS requests", async () => {
      let interceptedConfig: any;
      const adapter = async (config: InternalAxiosRequestConfig) => {
        interceptedConfig = config;
        return { data: { success: true }, status: 200, statusText: "OK", headers: new AxiosHeaders(), config } as AxiosResponse;
      };

      await apiClient.options("/test", { adapter });
      expect(interceptedConfig.headers["X-XSRF-TOKEN"]).toBeUndefined();
    });
  });

  describe("response interceptor", () => {
    let originalWindow: any;
    let originalFetch: any;

    beforeEach(() => {
      originalWindow = global.window;
      originalFetch = global.fetch;

      global.window = {
        location: {
          pathname: "/user/dashboard",
          href: ""
        }
      } as any;
    });

    afterEach(() => {
      global.window = originalWindow;
      global.fetch = originalFetch;
    });

    it("extracts response.data on success", async () => {
      const adapter = async (config: InternalAxiosRequestConfig) => {
        return { data: { success: true }, status: 200, statusText: "OK", headers: new AxiosHeaders(), config } as AxiosResponse;
      };

      const response = await apiClient.get("/test", { adapter });
      expect(response).toEqual({ success: true } as any);
    });

    it("handles 401 error, retries the request on successful refresh", async () => {
      let adapterCallCount = 0;
      const adapter = async (config: InternalAxiosRequestConfig) => {
        adapterCallCount++;
        if (adapterCallCount === 1) {
          throw new AxiosError("Unauthorized", "401", config, {} as any, {
            data: { message: "Unauthorized" },
            status: 401,
            statusText: "Unauthorized",
            headers: new AxiosHeaders(),
            config,
          } as AxiosResponse);
        }
        return { data: { success: true }, status: 200, statusText: "OK", headers: new AxiosHeaders(), config } as AxiosResponse;
      };

      global.fetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })) as any;

      const response = await apiClient.get("/test", { adapter });
      expect(response).toEqual({ success: true } as any);
      expect(global.fetch).toHaveBeenCalledWith("/api/auth/refresh?role=user", expect.any(Object));
      expect(adapterCallCount).toBe(2);
    });

    it("redirects to login when 401 refresh fails", async () => {
      const adapter = async (config: InternalAxiosRequestConfig) => {
        throw new AxiosError("Unauthorized", "401", config, {} as any, {
          data: { message: "Unauthorized" },
          status: 401,
          statusText: "Unauthorized",
          headers: new AxiosHeaders(),
          config,
        } as AxiosResponse);
      };

      global.fetch = mock(() => Promise.resolve({
        ok: false,
        json: () => Promise.resolve({})
      })) as any;

      try {
        await apiClient.get("/test", { adapter });
        expect(true).toBe(false); // Should not reach here
      } catch (err: any) {
        expect(err.message).toBe("refresh_failed");
        expect(global.window.location.href).toBe("/login");
      }
    });

    it("redirects to admin login when 401 refresh fails for admin", async () => {
      global.window.location.pathname = "/admin/dashboard";

      const adapter = async (config: InternalAxiosRequestConfig) => {
        throw new AxiosError("Unauthorized", "401", config, {} as any, {
          data: { message: "Unauthorized" },
          status: 401,
          statusText: "Unauthorized",
          headers: new AxiosHeaders(),
          config,
        } as AxiosResponse);
      };

      global.fetch = mock(() => Promise.resolve({
        ok: false,
        json: () => Promise.resolve({})
      })) as any;

      try {
        await apiClient.get("/test", { adapter });
        expect(true).toBe(false); // Should not reach here
      } catch (err: any) {
        expect(err.message).toBe("refresh_failed");
        expect(global.window.location.href).toBe("/admin/login");
        expect(global.fetch).toHaveBeenCalledWith("/api/auth/refresh?role=admin", expect.any(Object));
      }
    });

    it("handles blocked error from 401 refresh", async () => {
      const adapter = async (config: InternalAxiosRequestConfig) => {
        throw new AxiosError("Unauthorized", "401", config, {} as any, {
          data: { message: "Unauthorized" },
          status: 401,
          statusText: "Unauthorized",
          headers: new AxiosHeaders(),
          config,
        } as AxiosResponse);
      };

      global.fetch = mock(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ blocked: true })
      })) as any;

      try {
        await apiClient.get("/test", { adapter });
        expect(true).toBe(false); // Should not reach here
      } catch (err: any) {
        expect(err.message).toBe("blocked");
        expect(global.window.location.href).toBe("/login?error=blocked");
      }
    });

    it("handles 403 blocked error directly", async () => {
      const adapter = async (config: InternalAxiosRequestConfig) => {
        throw new AxiosError("Forbidden", "403", config, {} as any, {
          data: { message: "Forbidden" },
          status: 403,
          statusText: "Forbidden",
          headers: new AxiosHeaders(),
          config,
        } as AxiosResponse);
      };

      try {
        await apiClient.get("/test", { adapter });
        expect(true).toBe(false); // Should not reach here
      } catch (err: any) {
        expect(err.message).toBe("Forbidden");
        expect(global.window.location.href).toBe("/login?error=blocked");
      }
    });
  });

});