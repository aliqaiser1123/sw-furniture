/**
 * Rate Limiting Utility
 * In-memory sliding window rate limiter for Next.js API routes and Server Actions.
 * For production multi-instance deployments, swap the Map store with Redis (Upstash).
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store (works for single-instance; use Redis for multi-instance)
const store = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // Start fresh window
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + options.windowMs,
    };
    store.set(key, newEntry);
    return { success: true, remaining: options.limit - 1, resetAt: newEntry.resetAt };
  }

  if (entry.count >= options.limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { success: true, remaining: options.limit - entry.count, resetAt: entry.resetAt };
}

// Preset configurations for common use cases
export const rateLimits = {
  /** Brute-force protection for login (5 attempts / 15 minutes) */
  auth: (ip: string) =>
    rateLimit(`auth:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000 }),

  /** Checkout protection (10 orders / hour) */
  checkout: (userId: string) =>
    rateLimit(`checkout:${userId}`, { limit: 10, windowMs: 60 * 60 * 1000 }),

  /** General API protection (100 requests / minute) */
  api: (ip: string) =>
    rateLimit(`api:${ip}`, { limit: 100, windowMs: 60 * 1000 }),

  /** Search protection (30 requests / minute) */
  search: (ip: string) =>
    rateLimit(`search:${ip}`, { limit: 30, windowMs: 60 * 1000 }),
};
