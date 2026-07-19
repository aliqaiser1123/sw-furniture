/**
 * Environment Variable Validation
 * Validates required env vars at startup. Throws clear errors if missing.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `[env] Missing required environment variable: "${key}". ` +
        `Please add it to your .env file. See .env.example for reference.`
    );
  }
  return value;
}

function optionalEnv(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

export const env = {
  // Core
  NODE_ENV: optionalEnv("NODE_ENV", "development"),
  APP_URL: optionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),

  // Database
  DATABASE_URL: requireEnv("DATABASE_URL"),

  // Auth
  BETTER_AUTH_SECRET: requireEnv("BETTER_AUTH_SECRET"),
  BETTER_AUTH_URL: optionalEnv("BETTER_AUTH_URL", "http://localhost:3000"),

  // Cloudinary (optional — warn if not set)
  CLOUDINARY_CLOUD_NAME: optionalEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: optionalEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: optionalEnv("CLOUDINARY_API_SECRET"),

  // Analytics (all optional)
  GOOGLE_ANALYTICS_ID: optionalEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"),
  CLARITY_ID: optionalEnv("NEXT_PUBLIC_CLARITY_ID"),
  META_PIXEL_ID: optionalEnv("NEXT_PUBLIC_META_PIXEL_ID"),
  GTM_ID: optionalEnv("NEXT_PUBLIC_GTM_ID"),

  // Monitoring (all optional)
  SENTRY_DSN: optionalEnv("SENTRY_DSN"),

  // Email (optional — placeholder for future)
  EMAIL_FROM: optionalEnv("EMAIL_FROM", "noreply@sheshamwood.com"),
  RESEND_API_KEY: optionalEnv("RESEND_API_KEY"),

  // Payment Gateways (future — all optional)
  JAZZCASH_MERCHANT_ID: optionalEnv("JAZZCASH_MERCHANT_ID"),
  JAZZCASH_PASSWORD: optionalEnv("JAZZCASH_PASSWORD"),
  EASYPAISA_STORE_ID: optionalEnv("EASYPAISA_STORE_ID"),
  EASYPAISA_HASH_KEY: optionalEnv("EASYPAISA_HASH_KEY"),

  // Helpers
  isProd: optionalEnv("NODE_ENV") === "production",
  isDev: optionalEnv("NODE_ENV", "development") === "development",
};
