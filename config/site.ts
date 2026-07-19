export const siteConfig = {
  name: "Shesham Wood Furniture",
  description: "Premium handcrafted wood furniture for your modern home.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/images/og-image.jpg",
  links: {
    twitter: "https://twitter.com/sheshamwood",
    instagram: "https://instagram.com/sheshamwood",
    facebook: "https://facebook.com/sheshamwood",
  },
};

export type SiteConfig = typeof siteConfig;
