import { Metadata } from "next";

export const defaultSEO: Metadata = {
  title: {
    default: "Shesham Wood Furniture",
    template: "%s | Shesham Wood Furniture",
  },
  description: "Premium handcrafted wood furniture for your modern home.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Shesham Wood Furniture",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shesham Wood Furniture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sheshamwood",
    creator: "@sheshamwood",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
