import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { redis } from "@/lib/redis";

export const getHealthFn = createServerFn({ method: "GET" }).handler(async () => {
  let dbStatus = "unknown";
  let redisStatus = "unknown";

  try {
    // Check DB
    const { error } = await supabase.from("user_roles").select("id").limit(1);
    dbStatus = error ? "down" : "up";

    // Check Redis
    if (redis) {
      await redis.ping();
      redisStatus = "up";
    } else {
      redisStatus = "disabled";
    }
  } catch (err) {
    console.error("[Health Check Failed]", err);
    if (dbStatus === "unknown") dbStatus = "down";
    if (redisStatus === "unknown") redisStatus = "down";
  }

  const isHealthy = dbStatus === "up" && (redisStatus === "up" || redisStatus === "disabled");

  if (!isHealthy) {
    throw new Error(`Service Unavailable: DB=${dbStatus}, Redis=${redisStatus}`);
  }

  return {
    status: "ok",
    db: dbStatus,
    redis: redisStatus,
    timestamp: new Date().toISOString(),
  };
});
