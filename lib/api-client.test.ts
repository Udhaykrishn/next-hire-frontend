import { expect, test, describe, afterEach, beforeEach } from "bun:test";
import { getCsrfToken } from "./api-client";

describe("getCsrfToken", () => {
  let originalDocument: any;

  beforeEach(() => {
    // Save the original document if it exists
    originalDocument = global.document;
  });

  afterEach(() => {
    // Restore the original document
    if (originalDocument === undefined) {
        // @ts-ignore
        delete global.document;
    } else {
        global.document = originalDocument;
    }
  });

  test("returns empty string when document is undefined", () => {
    // Ensure document is undefined
    // @ts-ignore
    delete global.document;
    expect(getCsrfToken()).toBe("");
  });

  test("returns empty string when cookie does not contain XSRF-TOKEN", () => {
    // @ts-ignore
    global.document = { cookie: "other_cookie=value; another=test" };
    expect(getCsrfToken()).toBe("");
  });

  test("returns empty string when cookie is empty", () => {
    // @ts-ignore
    global.document = { cookie: "" };
    expect(getCsrfToken()).toBe("");
  });

  test("returns decoded token when XSRF-TOKEN exists in cookie", () => {
    // @ts-ignore
    global.document = { cookie: "other=123; XSRF-TOKEN=test%20token; another=456" };
    expect(getCsrfToken()).toBe("test token");
  });

  test("returns token when XSRF-TOKEN is the only cookie", () => {
    // @ts-ignore
    global.document = { cookie: "XSRF-TOKEN=my_secret_token" };
    expect(getCsrfToken()).toBe("my_secret_token");
  });

  test("returns correct token when XSRF-TOKEN is at the beginning", () => {
    // @ts-ignore
    global.document = { cookie: "XSRF-TOKEN=start_token; other=123" };
    expect(getCsrfToken()).toBe("start_token");
  });

  test("handles empty XSRF-TOKEN value correctly", () => {
    // @ts-ignore
    global.document = { cookie: "other=123; XSRF-TOKEN=" };
    expect(getCsrfToken()).toBe("");
  });
});
