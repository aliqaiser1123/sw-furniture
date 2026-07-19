# API_BLUEPRINT.md

# Shesham Wood Furniture

Version: 1.0

Architecture: REST API

Backend: Next.js Route Handlers

Authentication: Better Auth

Response Format: JSON

---

# API Principles

Every endpoint must

- Return proper HTTP status codes
- Validate all inputs
- Require authentication where necessary
- Return consistent JSON responses
- Use pagination for large datasets
- Follow REST conventions
- Never expose sensitive data

---

# Response Format

Success

{
  "success": true,
  "message": "...",
  "data": {}
}

Error

{
  "success": false,
  "message": "...",
  "errors": []
}

---

# Authentication APIs

POST

/api/auth/register

Register customer

---

POST

/api/auth/login

Login

---

POST

/api/auth/logout

Logout

---

POST

/api/auth/forgot-password

Send reset email

---

POST

/api/auth/reset-password

Reset password

---

GET

/api/auth/me

Current user

---

PUT

/api/auth/profile

Update profile

---

# Product APIs

GET

/api/products

List products

Supports

- Pagination
- Search
- Category
- Collection
- Price
- Tags
- Sorting

---

GET

/api/products/:slug

Single product

---

POST

/api/products

Create product (Admin)

---

PUT

/api/products/:id

Update product

---

DELETE

/api/products/:id

Soft delete

---

GET

/api/products/featured

Featured products

---

GET

/api/products/latest

Newest products

---

GET

/api/products/search

Search products

---

# Category APIs

GET

/api/categories

GET

/api/categories/:slug

POST

/api/categories

PUT

/api/categories/:id

DELETE

/api/categories/:id

---

# Collection APIs

GET

/api/collections

GET

/api/collections/:slug

POST

/api/collections

PUT

/api/collections/:id

DELETE

/api/collections/:id

---

# Cart APIs

GET

/api/cart

POST

/api/cart/add

PUT

/api/cart/update

DELETE

/api/cart/remove

DELETE

/api/cart/clear

---

# Wishlist APIs

GET

/api/wishlist

POST

/api/wishlist/add

DELETE

/api/wishlist/remove

---

# Compare APIs

GET

/api/compare

POST

/api/compare/add

DELETE

/api/compare/remove

---

# Order APIs

GET

/api/orders

GET

/api/orders/:id

POST

/api/orders

PUT

/api/orders/:id

DELETE

/api/orders/:id

---

# Payment APIs

POST

/api/payments/create

POST

/api/payments/verify

GET

/api/payments/:id

---

# Coupon APIs

POST

/api/coupons/apply

GET

/api/coupons

POST

/api/coupons

PUT

/api/coupons/:id

DELETE

/api/coupons/:id

---

# Review APIs

GET

/api/reviews

POST

/api/reviews

PUT

/api/reviews/:id

DELETE

/api/reviews/:id

---

# Blog APIs

GET

/api/blog

GET

/api/blog/:slug

POST

/api/blog

PUT

/api/blog/:id

DELETE

/api/blog/:id

---

# Media APIs

POST

/api/media/upload

DELETE

/api/media/delete

GET

/api/media

---

# Contact APIs

POST

/api/contact

GET

/api/contact

PUT

/api/contact/:id

DELETE

/api/contact/:id

---

# Newsletter APIs

POST

/api/newsletter/subscribe

DELETE

/api/newsletter/unsubscribe

---

# Search APIs

GET

/api/search

Supports

- Products
- Categories
- Collections
- Blog

Future

AI Search

---

# SEO APIs

GET

/api/sitemap

GET

/api/robots

GET

/api/schema/:slug

---

# Dashboard APIs

GET

/api/admin/dashboard

Returns

- Revenue
- Orders
- Products
- Customers
- Analytics

---

# Analytics APIs

GET

/api/admin/analytics

GET

/api/admin/reports

GET

/api/admin/sales

GET

/api/admin/customers

---

# Settings APIs

GET

/api/settings

PUT

/api/settings

---

# Notification APIs

GET

/api/notifications

PUT

/api/notifications/read

DELETE

/api/notifications

---

# Future APIs

/api/ai/chat

/api/ai/recommendations

/api/ai/seo

/api/ai/room-designer

/api/ai/image-search

/api/ar

/api/mobile

---

# Security

Every protected API must

- Verify session
- Verify role
- Validate request
- Sanitize input
- Return proper error codes

---

# Status Codes

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

429 Too Many Requests

500 Internal Server Error

---

# Rate Limiting

Authentication APIs

5 requests/minute

Contact Form

5 requests/minute

Search

60 requests/minute

Public APIs

100 requests/minute

Admin APIs

Authenticated only

---

# Logging

Log

- Login
- Logout
- Product Changes
- Orders
- Payments
- Coupon Usage
- Admin Actions
- Errors

Never log

- Passwords
- Tokens
- Secret Keys
- Payment Credentials

---

# API Versioning

Current

/api/v1/

Future

/api/v2/

---

END OF DOCUMENT