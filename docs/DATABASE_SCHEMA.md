# DATABASE_SCHEMA.md

# Shesham Wood Furniture

Version: 1.0

Database: PostgreSQL (Neon)

ORM: Prisma

---

# Core Tables

## 1. users

Purpose:
Store all authenticated users.

Columns

- id (UUID, PK)
- name
- email (Unique)
- password_hash
- phone
- role (Customer/Admin/Staff)
- avatar_url
- email_verified
- status
- created_at
- updated_at

Relations

- Addresses
- Orders
- Reviews
- Wishlist
- Cart

---

## 2. addresses

Purpose

Customer delivery addresses.

Columns

- id
- user_id (FK)
- full_name
- phone
- country
- province
- city
- address
- postal_code
- is_default
- created_at

---

## 3. categories

Purpose

Product categories.

Columns

- id
- name
- slug
- description
- image_url
- parent_category_id (Nullable)
- seo_title
- meta_description
- created_at

---

## 4. collections

Purpose

Premium product collections.

Columns

- id
- name
- slug
- description
- banner_image
- seo_title
- meta_description
- created_at

---

## 5. products

Purpose

Store all furniture products.

Columns

Basic

- id
- sku
- name
- slug
- short_description
- description

Pricing

- price
- sale_price
- cost_price

Inventory

- stock
- low_stock_limit

Product

- category_id
- collection_id
- material
- wood_type
- finish
- color
- weight

Dimensions

- length
- width
- height

Shipping

- delivery_days
- warranty

Status

- featured
- published
- status

SEO

- seo_title
- meta_description
- focus_keyword

Media

- featured_image

Dates

- created_at
- updated_at

---

## 6. product_images

Columns

- id
- product_id
- image_url
- alt_text
- display_order

---

## 7. product_videos

Columns

- id
- product_id
- video_url

---

## 8. tags

Columns

- id
- name
- slug

---

## 9. product_tags

Columns

- product_id
- tag_id

---

## 10. cart

Columns

- id
- user_id
- created_at

---

## 11. cart_items

Columns

- id
- cart_id
- product_id
- quantity

---

## 12. wishlist

Columns

- id
- user_id

---

## 13. wishlist_items

Columns

- id
- wishlist_id
- product_id

---

## 14. orders

Columns

General

- id
- order_number
- user_id

Pricing

- subtotal
- discount
- shipping
- tax
- total

Status

- order_status
- payment_status

Delivery

- address_id

Dates

- created_at
- updated_at

---

## 15. order_items

Columns

- id
- order_id
- product_id
- quantity
- unit_price

---

## 16. payments

Columns

- id
- order_id
- payment_method
- transaction_id
- amount
- payment_status
- paid_at

---

## 17. coupons

Columns

- id
- code
- type
- value
- minimum_order
- expiry_date
- usage_limit
- active

---

## 18. reviews

Columns

- id
- product_id
- user_id
- rating
- review
- approved
- created_at

---

## 19. blog_posts

Columns

- id
- title
- slug
- excerpt
- content
- featured_image
- author
- seo_title
- meta_description
- published
- published_at

---

## 20. blog_categories

Columns

- id
- name
- slug

---

## 21. media_library

Columns

- id
- file_name
- file_url
- file_type
- uploaded_by
- created_at

---

## 22. contact_messages

Columns

- id
- name
- email
- phone
- subject
- message
- replied
- created_at

---

## 23. newsletter

Columns

- id
- email
- subscribed_at

---

## 24. settings

Columns

Store Information

- store_name
- phone
- email
- address

SEO

- default_title
- default_description

Social

- facebook
- instagram
- linkedin
- youtube

Analytics

- google_analytics_id
- clarity_id

---

# Relationships

User

↓

Addresses

Orders

Wishlist

Cart

Reviews

Product

↓

Category

Collection

Images

Videos

Reviews

Tags

Order

↓

Order Items

↓

Payment

Blog

↓

Category

Media

---

# Indexes

Create indexes on

- email
- slug
- sku
- category_id
- collection_id
- order_number
- created_at

---

# Soft Delete

Enable for

- Products
- Categories
- Collections
- Blog Posts

---

# Future Tables

- ai_recommendations
- ai_room_designer
- ai_search_history
- product_360
- ar_models
- wholesale_orders
- dealers
- franchises
- loyalty_points
- gift_cards

---

End of DATABASE_SCHEMA.md