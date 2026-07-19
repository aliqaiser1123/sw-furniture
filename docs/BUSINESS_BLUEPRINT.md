# DATABASE BLUEPRINT

## Project
Shesham Wood Furniture

## Version
1.0

## Database
PostgreSQL

## ORM
Prisma ORM

## Purpose

This document defines the complete database architecture for the Shesham Wood Furniture platform.

The database is designed to be:

- Scalable
- Secure
- SEO Friendly
- AI Ready
- Future Expandable
- Optimized for Performance

---

# DATABASE OVERVIEW

The system consists of the following modules.

Authentication

Customer

Admin

Products

Categories

Collections

Inventory

Orders

Payments

Coupons

Reviews

Wishlist

Cart

Blog

SEO

Media

Notifications

Analytics

Settings

AI (Future)

---

# DATABASE TABLES

1. users

2. roles

3. permissions

4. user_addresses

5. customer_profiles

6. admin_profiles

7. products

8. product_images

9. product_videos

10. product_categories

11. categories

12. collections

13. collection_products

14. product_tags

15. tags

16. product_attributes

17. attribute_values

18. product_variants

19. inventory

20. stock_history

21. carts

22. cart_items

23. wishlists

24. wishlist_items

25. compare_products

26. orders

27. order_items

28. shipping_addresses

29. payments

30. payment_transactions

31. coupons

32. coupon_usage

33. reviews

34. review_images

35. blog_posts

36. blog_categories

37. blog_tags

38. media_library

39. seo_metadata

40. faqs

41. notifications

42. contact_messages

43. newsletter_subscribers

44. settings

45. activity_logs

46. analytics_events

47. search_history

48. recently_viewed

49. ai_generated_content

50. audit_logs

---

# RELATIONSHIPS

User

↓

Multiple Addresses

↓

Multiple Orders

↓

Multiple Reviews

↓

Wishlist

↓

Cart

↓

Notifications

Product

↓

Category

↓

Collection

↓

Inventory

↓

Images

↓

Videos

↓

Reviews

↓

SEO

↓

FAQs

↓

Variants

Order

↓

Order Items

↓

Payment

↓

Shipping Address

↓

Coupon

Blog

↓

Category

↓

Tags

↓

SEO

↓

Media

---

# COMMON COLUMNS

Every table should include

id

created_at

updated_at

deleted_at (Soft Delete)

created_by (optional)

updated_by (optional)

status (where applicable)

---

# INDEXES

Create indexes on

slug

sku

email

phone

category_id

collection_id

order_number

product_name

created_at

updated_at

status

---

# SOFT DELETE

Never permanently delete

Products

Orders

Customers

Categories

Collections

Blogs

Reviews

Instead

Use

deleted_at

---

# STATUS ENUMS

Product

Draft

Published

Archived

Out of Stock

Order

Pending

Confirmed

Processing

Packed

Shipped

Delivered

Cancelled

Returned

Payment

Pending

Paid

Failed

Refunded

Coupon

Active

Expired

Disabled

User

Active

Inactive

Suspended

---

# FILE STORAGE

Images

Cloudinary

Videos

Cloudinary

PDF

Cloudinary

Future

3D Models

AR Models

---

# FUTURE TABLES

room_designs

ar_models

ai_recommendations

voice_search

image_search

customer_preferences

designer_portfolios

dealer_accounts

export_orders

franchise_locations

---

# SECURITY

Passwords

Never stored in plain text

Sessions

Encrypted

OTP

Temporary

Audit Logs

Enabled

Role Permissions

Mandatory

---

# PERFORMANCE

Use Pagination

Lazy Loading

Database Indexes

Connection Pooling

Optimized Queries

Avoid N+1 Queries

---

# BACKUP

Daily Database Backup

Weekly Full Backup

Monthly Archive

---

# SCALABILITY

The schema must support

100,000+

Products

1 Million+

Customers

Millions of Orders

Without redesigning the database.

---

END OF DOCUMENT