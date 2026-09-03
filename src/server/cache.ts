import { createServerFn } from "@tanstack/react-start";
import { redis } from "@/lib/redis";

export const invalidateCacheFn = createServerFn({ method: "POST" })
  .validator((d: { keys: string[] }) => d)
  .handler(async ({ data: { keys } }) => {
    if (!redis) return { success: false, message: "Redis not configured" };

    try {
      await redis.del(...keys);
      return { success: true };
    } catch (error) {
      console.error("[Cache] Invalidation error:", error);
      return { success: false, error: String(error) };
    }
  });
