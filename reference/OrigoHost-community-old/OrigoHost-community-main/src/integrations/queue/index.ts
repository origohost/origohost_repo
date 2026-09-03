/**
 * Enterprise Message Queue Integration
 * Powered by Upstash QStash (Serverless Redis Queue)
 *
 * Used to offload heavy background tasks to prevent request blocking.
 */

interface QueueMessage {
  topic: "email.registration" | "user.analytics" | "image.optimize";
  payload: Record<string, any>;
  delaySeconds?: number;
}

export const queueClient = {
  /**
   * Pushes a message to the background queue.
   * In a true production environment, this sends an HTTP request to QStash
   * which then triggers a Supabase Edge Function asynchronously with retries.
   */
  async publish(message: QueueMessage) {
    const QSTASH_TOKEN = import.meta.env.VITE_QSTASH_TOKEN;
    const QSTASH_URL = "https://qstash.upstash.io/v2/publish";

    if (!QSTASH_TOKEN) {
      console.warn(
        "[QUEUE] QStash Token missing. Falling back to immediate execution (Not recommended for scale).",
      );
      // Fallback for local development
      await this.executeFallback(message);
      return { success: true, local: true };
    }

    try {
      const res = await fetch(`${QSTASH_URL}/${import.meta.env.VITE_QUEUE_ENDPOINT}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${QSTASH_TOKEN}`,
          "Content-Type": "application/json",
          ...(message.delaySeconds && { "Upstash-Delay": `${message.delaySeconds}s` }),
        },
        body: JSON.stringify(message),
      });

      if (!res.ok) throw new Error(await res.text());
      return { success: true, messageId: (await res.json()).messageId };
    } catch (e) {
      console.error("[QUEUE] Failed to publish message", e);
      throw e;
    }
  },

  // Fallback for development if QStash is not configured
  async executeFallback(message: QueueMessage) {
    setTimeout(
      () => {
        console.log(`[QUEUE FALLBACK] Executing topic: ${message.topic}`, message.payload);
        // In dev, you could trigger your edge function directly here via supabase.functions.invoke()
      },
      (message.delaySeconds || 0) * 1000,
    );
  },
};
