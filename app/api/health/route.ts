import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const startTime = Date.now();

  try {
    // 1. Database connectivity check
    await db.$queryRaw`SELECT 1`;

    const latencyMs = Date.now() - startTime;

    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || "unknown",
        environment: process.env.NODE_ENV || "unknown",
        uptime: process.uptime(),
        latencyMs,
        checks: {
          database: "ok",
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        latencyMs: Date.now() - startTime,
        checks: {
          database: "error",
        },
        error: message,
      },
      { status: 503 }
    );
  }
}
