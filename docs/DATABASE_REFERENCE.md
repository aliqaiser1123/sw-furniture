# Database Reference

The Shesham Wood Furniture platform uses a normalized PostgreSQL database managed via Prisma ORM.

## Core Domains

### 1. Authentication & Users
- **User**: Core user account (Customers and Admins).
- **Session / Account / Verification**: Auth tables strictly managed by Better Auth.
- **Address**: Multiple shipping/billing addresses tied to a User.

### 2. Catalog & Products
- **Category**: Top-level organization (e.g., "Living Room", "Bedroom").
- **Collection**: Thematic groupings (e.g., "The Royal Heritage Collection").
- **Product**: Core item with price, stock, and dimensions.
- **ProductImage / ProductVideo**: Associated media.
- **Tag / ProductTag**: Granular filtering attributes.

### 3. Commerce & Checkout
- **Cart / CartItem**: Server-side persistence of shopping carts.
- **Order / OrderItem**: Immutable records of a completed transaction.
- **Payment**: Payment gateway metadata linked to an Order.
- **Coupon**: Discount codes and usage limits.
- **Wishlist / WishlistItem**: Saved items.

### 4. Content Management (CMS)
- **BlogPost / BlogCategory**: Dynamic editorial content.
- **Banner**: Homepage hero and promotional banners.
- **StaticPage**: Privacy policy, Terms, and landing pages.
- **FAQ / FAQCategory**: Frequently asked questions.

### 5. Settings & Infrastructure
- **Settings**: Global configuration (social links, analytics IDs).
- **AISettings**: LLM provider toggles and API keys.
- **HomepageSettings**: Singleton defining the homepage layout.

## Important Schema Constraints
- Deleting a User will `SetNull` on their Orders, preserving financial history.
- Deleting an Order will `Cascade` delete its OrderItems and Payments.
- The `Order` model enforces an atomic constraint on inventory reduction during checkout.
