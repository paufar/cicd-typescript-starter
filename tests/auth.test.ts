import { describe, it, expect } from "vitest";
import { getAPIKey } from "../src/api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  it("returns null if authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null if authorization header does not start with ApiKey", () => {
    const headers: IncomingHttpHeaders = { authorization: "Bearer somekey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null if authorization header is malformed", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns the API key if authorization header is valid", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey my-secret-key" };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });
});