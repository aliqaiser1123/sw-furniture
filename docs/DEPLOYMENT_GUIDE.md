# Deployment Guide

Follow these steps to deploy the Shesham Wood Furniture platform to Vercel (recommended) or any Node.js environment.

## 1. Prerequisites
- Node.js 18.17+
- A PostgreSQL database (Neon Serverless recommended)
- Cloudinary Account
- Better Auth setup (e.g., SMTP keys or OAuth credentials)
- AI Provider API Keys (OpenAI, Anthropic, or Gemini)

## 2. Environment Variables
Ensure all required environment variables are set in your hosting provider. See `.env.example` for the complete list.

**Critical Variables:**
- `DATABASE_URL` — PostgreSQL connection string.
- `BETTER_AUTH_SECRET` — A secure 32+ character random string.
- `BETTER_AUTH_URL` — The canonical URL of the deployed application.
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — Cloudinary config.

## 3. Vercel Deployment (Recommended)
1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Log in to Vercel and click **Add New Project**.
3. Import the repository.
4. Expand the **Environment Variables** section and paste the contents of your `.env` file.
5. Click **Deploy**.

Vercel will automatically detect Next.js and run `npm run build`.

## 4. Database Migrations
In a production environment, you must apply database migrations.

If using Vercel, Next.js handles the build step. However, you should run migrations manually before the first deployment or set up a CI pipeline.
```bash
npx prisma migrate deploy
npx prisma generate
```

## 5. Post-Deployment Checklist
1. Visit `/api/health` to verify database connectivity.
2. Log in and assign yourself the `ADMIN` role directly in the PostgreSQL database for the first user.
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
   ```
3. Navigate to the Admin Dashboard (`/admin/settings`) and configure the AI Keys and Analytics IDs.
4. Verify image uploads via Cloudinary.
