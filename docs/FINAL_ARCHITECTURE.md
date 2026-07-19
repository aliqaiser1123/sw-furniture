# Final Architecture (Version 1.0)

## Overview
Shesham Wood Furniture is an enterprise-grade, highly scalable e-commerce platform built on Next.js 16 (App Router) and PostgreSQL. It combines a premium customer storefront with a comprehensive business administration portal, powered by real-time analytics and AI integrations.

## Core Technologies
- **Framework:** Next.js 16.2 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Framer Motion
- **UI Components:** Radix UI primitives, shadcn/ui
- **Database:** PostgreSQL (Neon Serverless)
- **ORM:** Prisma
- **Authentication:** Better Auth (Database Adapter)
- **Media Storage:** Cloudinary
- **AI Infrastructure:** Vercel AI SDK v4 (Multi-model: OpenAI, Anthropic, Gemini)

## High-Level Architecture
1. **Storefront (Customer App):**
   - Server Components for static product listings, SEO, and CMS-driven pages.
   - Client Components for interactive features (Cart, Wishlist, Checkout, AI Assistant).
   - Dynamic caching strategy with ISR (`unstable_cache`) for rapid TTFB.

2. **Admin CMS (Business App):**
   - Protected behind Role-Based Access Control (RBAC).
   - Comprehensive CRUD capabilities for Products, Orders, Users, Banners, FAQs, and Static Pages.
   - Real-time business intelligence dashboards.

3. **Commerce Engine:**
   - Atomic SQL transactions (`$transaction`) for order creation and inventory decrementing to prevent overselling.
   - Abstracted payment gateway integration prepared for Stripe, JazzCash, and EasyPaisa.
   - Zustand for client-side Cart state with local storage persistence.

4. **AI Layer:**
   - Unified API routes wrapping the Vercel AI SDK.
   - Context-aware text generation for customer support (`/api/ai/chat`).
   - Prepared vector embeddings and image generation hooks for Room Designer and Visual Search.

## Deployment Topology
- **Edge Network:** Vercel (Hosting, Edge Functions, CDN caching).
- **Database:** Neon PostgreSQL (connection pooling enabled).
- **Media:** Cloudinary CDN.
- **Analytics:** Integrated GA4, Meta Pixel, and Microsoft Clarity (configurable via Admin CMS).
