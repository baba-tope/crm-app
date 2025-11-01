// Lightweight in-memory rate limiter suitable for Next.js Middleware (Edge)
// Sliding window: limit N requests within a window (seconds) per key

type Result = { ok: boolean; remaining: number; reset: number; retryAfter: number }

type Options = { limit: number; window: number }

// In-memory state (per edge instance)
const store = new Map<string, { count: number; resetAt: number }>()

export async function rateLimit(key: string, options: Options): Promise<Result> {
  const now = Math.floor(Date.now() / 1000)
  const window = Math.max(1, Math.floor(options.window))
  const limit = Math.max(1, Math.floor(options.limit))

  let entry = store.get(key)
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + window }
    store.set(key, entry)
  }

  if (entry.count >= limit) {
    const retryAfter = Math.max(0, entry.resetAt - now)
    return { ok: false, remaining: 0, reset: entry.resetAt, retryAfter }
  }

  entry.count += 1
  const remaining = Math.max(0, limit - entry.count)
  const retryAfter = Math.max(0, entry.resetAt - now)
  return { ok: true, remaining, reset: entry.resetAt, retryAfter }
}
