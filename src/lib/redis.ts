import { Redis } from "@upstash/redis";

const getRedisClient = () => {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
};

export const redis = getRedisClient();

/**
 * Wraps a database fetch function with an Upstash Redis cache layer.
 * Gracefully falls back to direct DB fetch if Redis is not configured or fails.
 */
export async function fetchWithCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  expirationSeconds: number = 300, // 5 minutes default
): Promise<T> {
  if (!redis) {
    console.warn(`[Cache] Redis not configured. Bypassing cache for key: ${key}`);
    return fetchFn();
  }

  try {
    const cachedData = await redis.get<T>(key);
    if (cachedData) {
      console.log(`[Cache HIT] ${key}`);
      return cachedData;
    }

    console.log(`[Cache MISS] ${key}. Fetching from origin...`);
    const data = await fetchFn();

    // Non-blocking save to cache
    redis.set(key, data, { ex: expirationSeconds }).catch((err) => {
      console.error(`[Cache SAVE ERROR] ${key}:`, err);
    });

    return data;
  } catch (error) {
    console.error(`[Cache FATAL ERROR] ${key}:`, error);
    // Graceful fallback
    return fetchFn();
  }
}
