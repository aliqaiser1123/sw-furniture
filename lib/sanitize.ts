/**
 * Input Sanitization Utilities
 * Prevents XSS and injection attacks on all user-supplied input.
 */

/**
 * Strip HTML tags and encode dangerous characters to prevent XSS.
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

/**
 * Sanitize a URL — only allow http/https protocols.
 */
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "#"; // Block javascript: and data: URIs
    }
    return parsed.toString();
  } catch {
    return "#"; // Invalid URL
  }
}

/**
 * Sanitize an email address.
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().replace(/[^a-z0-9@._+-]/g, "");
}

/**
 * Sanitize a slug — lowercase, alphanumeric and hyphens only.
 */
export function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

/**
 * Sanitize a plain string for safe DB insertion (trim + strip null bytes).
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/\0/g, "").trim();
}

/**
 * Sanitize numeric input with bounds checking.
 */
export function sanitizeNumber(input: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): number {
  const num = Number(input);
  if (isNaN(num)) return min;
  return Math.min(Math.max(num, min), max);
}
