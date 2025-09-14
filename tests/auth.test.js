import { describe, it, expect } from "vitest";
import { getAPIKey } from "../src/api/auth";
describe("getAPIKey", () => {
    it("returns null if authorization header is missing", () => {
        const headers = {};
        expect(getAPIKey(headers)).toBeNull();
    });
    it("returns null if authorization header does not start with ApiKey", () => {
        const headers = { authorization: "Bearer somekey" };
        expect(getAPIKey(headers)).toBeNull();
    });
    it("returns null if authorization header is malformed", () => {
        const headers = { authorization: "ApiKey" };
        expect(getAPIKey(headers)).toBeNull();
    });
    it("returns the API key if authorization header is valid", () => {
        const headers = { authorization: "ApiKey my-secret-key" };
        expect(getAPIKey(headers)).toBe("my-secret-key");
    });
});
