# FOLDER_STRUCTURE.md

Project Name:
Shesham Wood Furniture

Tech Stack

Next.js 16
TypeScript
Tailwind CSS
Prisma
PostgreSQL
Cloudinary

------------------------------------------------

ROOT

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
scripts/
middleware/
config/

------------------------------------------------

APP

app/

(auth)

(admin)

(shop)

(blog)

(api)

dashboard/

cart/

checkout/

wishlist/

search/

about/

contact/

privacy/

terms/

layout.tsx

page.tsx

loading.tsx

error.tsx

not-found.tsx

------------------------------------------------

COMPONENTS

components/

ui/

layout/

buttons/

cards/

forms/

tables/

modals/

dialogs/

charts/

navigation/

dashboard/

product/

blog/

animations/

common/

------------------------------------------------

FEATURES

features/

authentication/

products/

categories/

collections/

cart/

wishlist/

orders/

payments/

reviews/

blog/

dashboard/

notifications/

search/

seo/

analytics/

------------------------------------------------

LIB

lib/

auth.ts

db.ts

cloudinary.ts

seo.ts

validation.ts

constants.ts

helpers.ts

------------------------------------------------

SERVICES

services/

product.service.ts

order.service.ts

payment.service.ts

user.service.ts

search.service.ts

blog.service.ts

------------------------------------------------

HOOKS

hooks/

use-cart.ts

use-auth.ts

use-theme.ts

use-pagination.ts

use-search.ts

------------------------------------------------

UTILS

utils/

format-price.ts

slugify.ts

date.ts

pagination.ts

image.ts

validators.ts

------------------------------------------------

PUBLIC

public/

images/

icons/

logos/

banners/

favicons/

fonts/

------------------------------------------------

PRISMA

prisma/

schema.prisma

seed.ts

migrations/

------------------------------------------------

STYLES

styles/

globals.css

theme.css

------------------------------------------------

CONFIG

config/

site.ts

navigation.ts

theme.ts

seo.ts

------------------------------------------------

SCRIPTS

scripts/

seed-products.ts

generate-sitemap.ts

backup-db.ts

------------------------------------------------

DOCUMENTS

docs/

MASTER_PRD.md

PROJECT_RULES.md

DATABASE_SCHEMA.md

DATABASE_BLUEPRINT.md

API_BLUEPRINT.md

DESIGN_SYSTEM.md

SEO_STRATEGY.md

COMPONENT_LIBRARY.md

FOLDER_STRUCTURE.md

------------------------------------------------

RULES

One Component = One File

One Feature = One Folder

No Duplicate Components

No Inline Styles

No Hardcoded Colors

Always Use TypeScript

Always Reusable Components

Never Put Business Logic Inside UI Components

------------------------------------------------

END