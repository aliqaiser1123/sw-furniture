# PROMPT_RULES.md

# Shesham Wood Furniture

Version: 1.0

Purpose

This document defines the rules that every Antigravity prompt must follow while building the project.

------------------------------------------------

GENERAL RULES

Always follow:

MASTER_PRD.md

PROJECT_RULES.md

DESIGN_SYSTEM.md

DATABASE_SCHEMA.md

API_BLUEPRINT.md

SEO_STRATEGY.md

COMPONENT_LIBRARY.md

FOLDER_STRUCTURE.md

------------------------------------------------

ARCHITECTURE

Always use the approved folder structure.

Never change architecture without approval.

Never remove existing features unless instructed.

Never rename folders unnecessarily.

Always build production-ready code.

------------------------------------------------

CODING

Use

Next.js 16

React 19

TypeScript

Tailwind CSS v4

shadcn/ui

Prisma

PostgreSQL

Better Auth

Cloudinary

Never use JavaScript.

Never use "any" unless unavoidable.

Always use strict TypeScript.

------------------------------------------------

COMPONENTS

Reuse existing components.

Never duplicate components.

One responsibility per component.

Keep components small and maintainable.

------------------------------------------------

DATABASE

Always follow DATABASE_SCHEMA.md.

Never invent new tables without approval.

Never remove columns.

Use Prisma best practices.

Use migrations correctly.

------------------------------------------------

API

Always follow API_BLUEPRINT.md.

Return consistent JSON responses.

Validate every request.

Protect private endpoints.

Use proper HTTP status codes.

------------------------------------------------

UI / UX

Follow DESIGN_SYSTEM.md.

Premium appearance.

Minimal design.

Responsive.

Accessible.

Fast.

Never introduce visual clutter.

------------------------------------------------

SEO

Every new page must include:

Meta Title

Meta Description

Canonical URL

Open Graph

Twitter Card

Structured Data

Alt Text

Semantic HTML

------------------------------------------------

PERFORMANCE

Optimize images.

Lazy load media.

Use Server Components when possible.

Avoid unnecessary client components.

Keep Lighthouse score above 95.

------------------------------------------------

SECURITY

Validate all inputs.

Protect admin routes.

Store secrets in environment variables.

Never expose credentials.

Sanitize user content.

------------------------------------------------

ACCESSIBILITY

Keyboard navigation.

Screen reader support.

Proper labels.

Correct heading hierarchy.

Color contrast compliance.

------------------------------------------------

GIT

Do not modify unrelated files.

Keep commits feature-focused.

Maintain clean project structure.

------------------------------------------------

ERROR HANDLING

Handle loading states.

Handle empty states.

Handle API failures.

Show meaningful user messages.

Never crash the application.

------------------------------------------------

DOCUMENTATION

When creating a major feature:

Explain what was built.

List modified files.

Mention database changes.

Mention new environment variables.

Mention testing steps.

------------------------------------------------

FUTURE READINESS

Design everything to support:

AI Room Designer

AR Preview

Voice Search

Multi-language

Multi-currency

Mobile App

Wholesale Portal

Dealer Portal

------------------------------------------------

DO NOT

❌ Rewrite stable code unnecessarily

❌ Duplicate logic

❌ Break existing features

❌ Ignore TypeScript errors

❌ Ignore accessibility

❌ Ignore SEO

❌ Ignore responsiveness

❌ Add unnecessary packages

------------------------------------------------

DEFINITION OF DONE

A task is complete only if:

✓ Feature works

✓ No TypeScript errors

✓ Responsive

✓ Accessible

✓ SEO optimized

✓ Performance optimized

✓ Uses reusable components

✓ Tested

✓ Documented

✓ Ready for production

------------------------------------------------

FINAL RULE

If any instruction conflicts with these rules, prioritize:

1. MASTER_PRD.md
2. DATABASE_SCHEMA.md
3. PROJECT_RULES.md
4. DESIGN_SYSTEM.md
5. API_BLUEPRINT.md
6. PROMPT_RULES.md

Always build with long-term scalability, maintainability, and production quality in mind.

END OF DOCUMENT