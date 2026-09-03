/**
 * Centralized TanStack Query keys.
 * Feature modules should extend this via their own key factory to avoid collisions.
 */
export const queryKeys = {
  all: ["origohosts"] as const,
  health: () => [...queryKeys.all, "health"] as const,
};
