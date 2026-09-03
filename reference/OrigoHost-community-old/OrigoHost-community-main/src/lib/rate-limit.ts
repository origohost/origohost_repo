import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

// In-memory fallback if Redis is disabled
class FallbackRateLimiter {
  private store = new Map<string, { count: number; resetTime: number }>();

  constructor(
    public windowMs: number,
    public max: number,
  ) {}

  async limit(
    identifier: string,
  ): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now();
    const record = this.store.get(identifier);

    if (!record) {
      this.store.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return {
        success: true,
        limit: this.max,
        remaining: this.max - 1,
        reset: now + this.windowMs,
      };
    }

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + this.windowMs;
      return { success: true, limit: this.max, remaining: this.max - 1, reset: record.resetTime };
    }

    record.count++;
    return {
      success: record.count <= this.max,
      limit: this.max,
      remaining: Math.max(0, this.max - record.count),
      reset: record.resetTime,
    };
  }
}

import { CircuitBreaker } from "./circuit-breaker";

// Global instances
const authRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "15 m"), prefix: "rl:auth" })
  : null;
const authFallback = new FallbackRateLimiter(15 * 60 * 1000, 5);
const authBreaker = new CircuitBreaker("AuthRateLimiter");

export const authRateLimiter = {
  limit: async (ip: string) =>
    authRatelimit
      ? authBreaker.fire(
          () => authRatelimit.limit(ip),
          () => authFallback.limit(ip),
        )
      : authFallback.limit(ip),
};

const contactRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "1 h"), prefix: "rl:contact" })
  : null;
const contactFallback = new FallbackRateLimiter(60 * 60 * 1000, 5);
const contactBreaker = new CircuitBreaker("ContactRateLimiter");

export const contactRateLimiter = {
  limit: async (ip: string) =>
    contactRatelimit
      ? contactBreaker.fire(
          () => contactRatelimit.limit(ip),
          () => contactFallback.limit(ip),
        )
      : contactFallback.limit(ip),
};

const ambassadorRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, "1 d"), prefix: "rl:ambassador" })
  : null;
const ambassadorFallback = new FallbackRateLimiter(24 * 60 * 60 * 1000, 3);
const ambassadorBreaker = new CircuitBreaker("AmbassadorRateLimiter");

export const ambassadorRateLimiter = {
  limit: async (ip: string) =>
    ambassadorRatelimit
      ? ambassadorBreaker.fire(
          () => ambassadorRatelimit.limit(ip),
          () => ambassadorFallback.limit(ip),
        )
      : ambassadorFallback.limit(ip),
};

const globalApiRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(100, "1 m"), prefix: "rl:api" })
  : null;
const globalApiFallback = new FallbackRateLimiter(60 * 1000, 100);
const globalApiBreaker = new CircuitBreaker("GlobalApiRateLimiter");

export const globalApiRateLimiter = {
  limit: async (ip: string) =>
    globalApiRatelimit
      ? globalApiBreaker.fire(
          () => globalApiRatelimit.limit(ip),
          () => globalApiFallback.limit(ip),
        )
      : globalApiFallback.limit(ip),
};

const globalWriteRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, "1 m"), prefix: "rl:write" })
  : null;
const globalWriteFallback = new FallbackRateLimiter(60 * 1000, 20);
const globalWriteBreaker = new CircuitBreaker("GlobalWriteRateLimiter");

export const globalWriteRateLimiter = {
  limit: async (ip: string) =>
    globalWriteRatelimit
      ? globalWriteBreaker.fire(
          () => globalWriteRatelimit.limit(ip),
          () => globalWriteFallback.limit(ip),
        )
      : globalWriteFallback.limit(ip),
};
