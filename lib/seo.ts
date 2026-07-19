import { Metadata } from "next";

export function constructMetadata({
  title = "Shesham Wood Furniture | Premium Wood Furniture",
  description = "Discover our exquisite collection of handcrafted shesham wood furniture. Elegant, durable, and timeless pieces for your modern home.",
  image = "/images/og-image.jpg",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@sheshamwood",
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
