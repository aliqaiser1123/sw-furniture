# PROJECT_RULES.md

# Shesham Wood Furniture

Version: 1.0

---

# Purpose

This document defines the engineering standards, coding guidelines, architecture principles, and development workflow for the Shesham Wood Furniture platform.

Every developer, AI coding assistant, and contributor must follow these rules throughout the project.

---

# Tech Stack

Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Motion
- Lucide React

Backend
- Next.js Server Actions
- Next.js Route Handlers
- Prisma ORM
- PostgreSQL (Neon)

Authentication
- Better Auth

Storage
- Cloudinary

Deployment
- Vercel

Version Control
- Git + GitHub

---

# Project Principles

The project must be:

- Modular
- Scalable
- Secure
- SEO Friendly
- Mobile First
- AI Ready
- Accessible
- Maintainable
- Production Ready

---

# Coding Standards

Always use TypeScript.

Never use JavaScript.

Never use "any" unless absolutely unavoidable.

Use meaningful variable names.

Keep functions short.

Avoid duplicated code.

Always create reusable components.

Keep files organized.

Prefer composition over duplication.

---

# Folder Structure

app/

components/

features/

lib/

hooks/

services/

prisma/

types/

utils/

public/

styles/

docs/

---

# Component Rules

Every component should:

- Have a single responsibility.
- Be reusable.
- Accept props.
- Avoid hardcoded values.
- Support responsive layouts.
- Use TypeScript interfaces.

---

# Naming Conventions

Components

ProductCard.tsx

HeroSection.tsx

Navbar.tsx

Files

kebab-case

Routes

/products

/blog

/cart

Variables

camelCase

Types

PascalCase

Constants

UPPER_CASE

---

# Styling Rules

Only use Tailwind CSS.

Never write inline CSS.

Avoid unnecessary custom CSS.

Maintain consistent spacing.

Use responsive utilities.

Follow the design system.

---

# Performance Rules

Lazy load images.

Optimize fonts.

Use Server Components where appropriate.

Use Client Components only when needed.

Implement pagination.

Use caching.

Optimize bundle size.

---

# Accessibility

Use semantic HTML.

Add image alt text.

Maintain keyboard navigation.

Ensure sufficient color contrast.

Use accessible forms.

Use proper heading hierarchy.

---

# SEO Rules

Every page must include:

Title

Meta Description

Canonical URL

Open Graph

Twitter Card

Structured Data

Breadcrumbs

Image Alt Text

Readable URLs

---

# Database Rules

Never duplicate data.

Use foreign keys.

Use soft deletes where appropriate.

Store timestamps.

Normalize data.

Design for scalability.

---

# Authentication Rules

Protect private routes.

Encrypt sensitive data.

Verify email addresses.

Use role-based authorization.

Never expose secrets to the client.

---

# Security Rules

Validate all input.

Prevent SQL injection.

Prevent XSS.

Prevent CSRF.

Sanitize user content.

Never trust client-side validation alone.

Store secrets in environment variables.

---

# Git Workflow

Branches

main

develop

feature/<feature-name>

Never commit directly to main.

Every feature should have its own branch.

Use descriptive commit messages.

---

# Commit Examples

feat(products): add product management

fix(auth): resolve login issue

refactor(ui): improve navbar layout

docs(prd): update project rules

---

# Testing

Every feature must be tested for:

Desktop

Tablet

Mobile

Authentication

CRUD

Performance

SEO

Accessibility

Error handling

---

# Documentation

Every major feature must have documentation.

Include:

Purpose

Architecture

Components

Database impact

API usage

Future improvements

---

# AI Coding Assistant Rules

When using Antigravity:

Never remove existing functionality unless instructed.

Never rename files without reason.

Never change database structure without approval.

Never introduce breaking changes.

Reuse existing components.

Follow project architecture.

Write production-ready code.

Explain assumptions before making structural changes.

---

# Future Expansion

The architecture must support:

AI Room Designer

AI Search

Voice Search

AR Preview

Wholesale Portal

Dealer Portal

Mobile App

Multi-language

Multi-currency

International Shipping

---

# Definition of Done

A feature is complete only if:

- Code compiles.
- No TypeScript errors.
- Responsive on all devices.
- Accessible.
- SEO compliant.
- Performance optimized.
- Tested.
- Documented.
- Ready for production.

---

End of PROJECT_RULES.md