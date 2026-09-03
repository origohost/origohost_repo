export type CircuitBreakerState = "CLOSED" | "OPEN" | "HALF_OPEN";

export interface CircuitBreakerOptions {
  failureThreshold: number; // Number of failures before opening
  resetTimeoutMs: number; // Time to wait before half-open
}

export class CircuitBreaker {
  public state: CircuitBreakerState = "CLOSED";
  private failures = 0;
  private nextAttemptTime = 0;

  constructor(
    private readonly name: string,
    private readonly options: CircuitBreakerOptions = {
      failureThreshold: 3,
      resetTimeoutMs: 10000,
    },
  ) {}

  async fire<T>(action: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
    if (this.state === "OPEN") {
      if (Date.now() > this.nextAttemptTime) {
        this.state = "HALF_OPEN";
      } else {
        console.warn(`[CircuitBreaker] ${this.name} is OPEN. Executing fallback.`);
        return fallback();
      }
    }

    try {
      const result = await action();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      console.error(`[CircuitBreaker] ${this.name} Action failed:`, error);
      return fallback();
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = "CLOSED";
  }

  private onFailure() {
    this.failures++;
    if (this.failures >= this.options.failureThreshold) {
      this.state = "OPEN";
      this.nextAttemptTime = Date.now() + this.options.resetTimeoutMs;
      console.error(`[CircuitBreaker] ${this.name} threshold reached. Tripping breaker OPEN.`);
    }
  }
}
