import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/shop", "/product/", "/blog/", "/collections/", "/faq", "/about", "/contact"],
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/dashboard/",
          "/login",
          "/register",
          "/checkout",
          "/cart",
          "/order/",
          "/account/",
          "/_next/",
        ],
      },
      // Block AI scrapers from training on content
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "ChatGPT-User",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
