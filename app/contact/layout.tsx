import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch",
  description:
    "Have a question about our furniture? Contact Shesham Wood Furniture via phone, email, WhatsApp, or our contact form. We respond within 24 hours.",
  openGraph: {
    title: "Contact Shesham Wood Furniture",
    description: "Reach out to us for product inquiries, custom orders, or support.",
    url: `${siteConfig.url}/contact`,
  },
  alternates: { canonical: `${siteConfig.url}/contact` },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Shesham Wood Furniture",
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "LocalBusiness",
    name: siteConfig.name,
    telephone: "+1-800-123-4567",
    email: "support@sheshamwood.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Furniture Avenue",
      addressLocality: "Design District",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
