import { describe, it, expect } from "vitest";
import { isAccountNotFoundError } from "../src/chains/stellar.js";

describe("isAccountNotFoundError", () => {
  it("matches account not found error messages correctly", () => {
    expect(isAccountNotFoundError(new Error("Account not found"))).toBe(true);
    expect(isAccountNotFoundError(new Error("account not found on ledger"))).toBe(true);
    expect(isAccountNotFoundError(new Error("Stellar RPC: Account Not Found"))).toBe(true);
  });

  it("does not match generic 404 Not Found or transport outages", () => {
    expect(isAccountNotFoundError(new Error("404 Not Found"))).toBe(false);
    expect(isAccountNotFoundError(new Error("Endpoint not found"))).toBe(false);
    expect(isAccountNotFoundError(new Error("RPC gateway error: not found"))).toBe(false);
    expect(isAccountNotFoundError(new Error("Failed to fetch: route not found"))).toBe(false);
    expect(isAccountNotFoundError(new Error("Connection refused: host not found"))).toBe(false);
  });

  it("properly rejects non-Error types", () => {
    expect(isAccountNotFoundError(null)).toBe(false);
    expect(isAccountNotFoundError(undefined)).toBe(false);
    expect(isAccountNotFoundError("account not found")).toBe(false);
    expect(isAccountNotFoundError({ message: "account not found" })).toBe(false);
    expect(isAccountNotFoundError(404)).toBe(false);
  });
});
