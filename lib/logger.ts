/**
 * Centralized Logger
 * Structured, leveled logging with environment awareness.
 * Drop-in compatible with external services (BetterStack, Sentry, OpenTelemetry).
 */

type LogLevel = "debug" | "info" | "warn" | "error";
type LogContext = Record<string, unknown>;

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
}

function formatEntry(entry: LogEntry): string {
  const base = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;
  if (entry.context && Object.keys(entry.context).length > 0) {
    return `${base} ${JSON.stringify(entry.context)}`;
  }
  return base;
}

function log(level: LogLevel, message: string, context?: LogContext) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
  };

  const formatted = formatEntry(entry);

  // In production, you would ship this to BetterStack/Axiom/Sentry instead
  switch (level) {
    case "debug":
      if (process.env.NODE_ENV === "development") console.debug(formatted);
      break;
    case "info":
      console.info(formatted);
      break;
    case "warn":
      console.warn(formatted);
      break;
    case "error":
      console.error(formatted);
      break;
  }

  // === Future external logging integration point ===
  // if (process.env.BETTERSTACK_SOURCE_TOKEN) {
  //   sendToBetterStack(entry);
  // }
  // if (process.env.SENTRY_DSN) {
  //   Sentry.captureMessage(message, { level, extra: context });
  // }
}

export const logger = {
  debug: (msg: string, ctx?: LogContext) => log("debug", msg, ctx),
  info: (msg: string, ctx?: LogContext) => log("info", msg, ctx),
  warn: (msg: string, ctx?: LogContext) => log("warn", msg, ctx),
  error: (msg: string, ctx?: LogContext) => log("error", msg, ctx),

  // Domain-specific helpers
  auth: (msg: string, ctx?: LogContext) => log("info", `[AUTH] ${msg}`, ctx),
  order: (msg: string, ctx?: LogContext) => log("info", `[ORDER] ${msg}`, ctx),
  admin: (msg: string, ctx?: LogContext) => log("info", `[ADMIN] ${msg}`, ctx),
  payment: (msg: string, ctx?: LogContext) => log("info", `[PAYMENT] ${msg}`, ctx),
};
