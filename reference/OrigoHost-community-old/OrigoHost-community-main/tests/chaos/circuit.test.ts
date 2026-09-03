import { describe, it, expect, vi } from "vitest";
import { CircuitBreaker } from "../../src/lib/circuit-breaker";

describe("Chaos Engineering - Circuit Breaker Tests", () => {
  it("Should successfully degrade to fallback when network fails", async () => {
    const breaker = new CircuitBreaker("TestService", {
      failureThreshold: 2,
      resetTimeoutMs: 1000,
    });

    // Mock a network call that always throws (simulating Redis failure)
    const failingAction = vi.fn().mockRejectedValue(new Error("Connection Timeout"));
    const fallbackAction = vi.fn().mockResolvedValue("Fallback Triggered");

    // Attempt 1 - fails
    const res1 = await breaker.fire(failingAction, fallbackAction);
    expect(res1).toBe("Fallback Triggered");
    expect(breaker.state).toBe("CLOSED"); // Threshold is 2

    // Attempt 2 - fails, threshold reached
    const res2 = await breaker.fire(failingAction, fallbackAction);
    expect(res2).toBe("Fallback Triggered");
    expect(breaker.state).toBe("OPEN"); // Circuit trips!

    // Attempt 3 - circuit is OPEN, should skip failingAction entirely
    failingAction.mockClear();
    const res3 = await breaker.fire(failingAction, fallbackAction);
    expect(res3).toBe("Fallback Triggered");
    expect(failingAction).not.toHaveBeenCalled(); // Fast failure!
  });

  it("Should gracefully recover after reset timeout", async () => {
    vi.useFakeTimers();
    const breaker = new CircuitBreaker("RecoveryService", {
      failureThreshold: 1,
      resetTimeoutMs: 5000,
    });

    const failingAction = vi.fn().mockRejectedValue(new Error("500 Internal Server Error"));
    const fallbackAction = vi.fn().mockResolvedValue("Fallback");

    // Trip the circuit
    await breaker.fire(failingAction, fallbackAction);
    expect(breaker.state).toBe("OPEN");

    // Fast-forward time past the reset timeout
    vi.advanceTimersByTime(5001);

    // Mock the network recovering
    const recoveredAction = vi.fn().mockResolvedValue("Success");

    // First request after timeout enters HALF_OPEN and succeeds
    const res = await breaker.fire(recoveredAction, fallbackAction);
    expect(breaker.state).toBe("CLOSED");
    expect(res).toBe("Success");

    vi.useRealTimers();
  });
});
