# Changelog

All notable changes to the Shesham Wood Furniture project will be documented in this file.

## [1.0.0] - Launch Candidate

### Added
- **Global QA**: Comprehensive review of all pages, forms, and database queries.
- **Analytics Dashboard**: Full suite of real-time charts (Revenue, Orders, Inventory, Customers) powered by Prisma.
- **AI Integration**: Custom Vercel AI SDK wrapper for intelligent chatbot and future image-generation workflows.
- **Commerce Flow**: Atomic checkout process enforcing stock limits and creating transactional records.
- **CMS**: Admin panels for Banners, Static Pages, FAQs, and global Site Settings.
- **Security**: Strict CSP headers, rate-limiting middleware, and server-side validation using Zod.
- **Documentation**: Finalized API, Database, Admin, Content, and Deployment guides.

### Changed
- Replaced mocked Next.js components with live Server Components fetching from PostgreSQL.
- Updated `AIChatWidget` to use the modern `@ai-sdk/react` v4 API (`sendMessage`, `status`).

### Fixed
- Resolved Prisma client initialization issues.
- Fixed TypeScript inference on complex `Order` include queries.
- Corrected field naming mismatches in the Analytics aggregation routes.

## [0.1.0] - Foundation Setup

### Added
- Next.js 16 App Router initialization.
- Tailwind CSS v4 styling structure.
- Prisma schema generation for all 25 tables.
- Better Auth configuration.
