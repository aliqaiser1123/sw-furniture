# API Reference

This document outlines the internal Next.js API routes used by the Shesham Wood Furniture platform. 
All routes are accessed relative to the base URL (e.g., `https://sheshamwood.com/api/...`).

## Authentication (`/api/auth/*`)
Powered by Better Auth. Handles session creation, validation, password resets, and OAuth providers (if configured).

- `POST /api/auth/sign-in/email` — Authenticate user with email and password.
- `POST /api/auth/sign-up/email` — Register a new user.
- `POST /api/auth/sign-out` — Terminate the current session.
- `GET /api/auth/get-session` — Retrieve the active session object.

## Artificial Intelligence (`/api/ai/*`)
Powered by the Vercel AI SDK.

- `POST /api/ai/chat` 
  - **Description**: Streams a conversational response from the configured AI provider.
  - **Body**: `{ "messages": [ { "role": "user", "content": "..." } ] }`
  - **Response**: `text/event-stream` (Vercel AI Data Stream protocol).
  
- `POST /api/ai/recommend`
  - **Description**: Analyzes cart and viewed items to return JSON recommendations.
  - **Body**: `{ "cartItems": string[], "viewedIds": string[] }`
  - **Response**: `application/json` (Array of recommended Product IDs).

## E-Commerce (`/api/checkout/*`)

- `POST /api/checkout/create-order`
  - **Description**: Verifies cart totals against the database, checks stock levels, and creates an atomic `Order` and `Payment` record.
  - **Body**: `{ items, addressId, paymentMethod, couponCode? }`
  - **Response**: `{ success: true, orderId: string }`

## Infrastructure (`/api/health`)

- `GET /api/health`
  - **Description**: Uptime monitoring endpoint. Checks database connection and returns latency metrics.
  - **Response**: `{ status: "healthy", timestamp: string, uptime: number, dbLatencyMs: number }`

---
*Note: Most data mutations in the admin panel are handled via Next.js Server Actions rather than REST endpoints for enhanced type safety and CSRF protection.*
