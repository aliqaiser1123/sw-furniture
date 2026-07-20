import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /account and its subroutes
  if (pathname.startsWith("/account")) {
    const { data: session } = await betterFetch<any>(
      "/api/auth/get-session",
      {
        baseURL: process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Prevent authenticated users from visiting login/register pages
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    const { data: session } = await betterFetch<any>(
      "/api/auth/get-session",
      {
        baseURL: process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (session) {
      const url = request.nextUrl.clone();
      url.pathname = "/account";
      return NextResponse.redirect(url);
    }
  }

  // Protect /admin routes (only ADMIN or STAFF allowed)
  if (pathname.startsWith("/admin")) {
    const { data: session } = await betterFetch<any>(
      "/api/auth/get-session",
      {
        baseURL: process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
      const url = request.nextUrl.clone();
      url.pathname = session ? "/" : "/login";
      if (!session) url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/login", "/register"],
};
