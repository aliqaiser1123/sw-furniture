import Link from "next/link";
import {
  Globe,
  Camera,
  Phone,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const footerLinks = {
  shop: [
    { label: "Living Room", href: "/shop?category=living-room" },
    { label: "Bedroom", href: "/shop?category=bedroom" },
    { label: "Dining Room", href: "/shop?category=dining-room" },
    { label: "Office Furniture", href: "/shop?category=office" },
    { label: "Outdoor", href: "/shop?category=outdoor" },
    { label: "All Products", href: "/shop" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Craftsmanship", href: "/about#craftsmanship" },
    { label: "Collections", href: "/collections" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Shipping Policy", href: "/shipping-returns" },
    { label: "Return Policy", href: "/shipping-returns#returns" },
    { label: "Warranty Policy", href: "/warranty" },
    { label: "FAQ", href: "/faq" },
  ],
};

const socialLinks = [
  { Icon: Globe, href: siteConfig.links.facebook, label: "Facebook" },
  { Icon: Camera, href: siteConfig.links.instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-primary border-t border-white/10" role="contentinfo">
      {/* Main Footer */}
      <div className="container-default py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 focus-brand rounded-md w-fit" aria-label="Shesham Wood Furniture">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">SW</span>
              </div>
              <div>
                <div className="font-heading text-xl font-semibold text-white leading-none">Shesham Wood</div>
                <div className="text-[10px] text-white/50 tracking-widest uppercase leading-none mt-0.5">Premium Furniture</div>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Crafting timeless Sheesham wood furniture for modern homes. Every piece tells a story of tradition, quality, and enduring elegance.
            </p>
            {/* Contact info */}
            <address className="not-italic space-y-2">
              <a href="tel:+923001234567" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors focus-brand rounded">
                <Phone className="w-4 h-4 shrink-0 text-accent" aria-hidden="true" />
                +92 300 123 4567
              </a>
              <a href="mailto:support@sheshamwood.com" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors focus-brand rounded">
                <Mail className="w-4 h-4 shrink-0 text-accent" aria-hidden="true" />
                support@sheshamwood.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="w-4 h-4 shrink-0 text-accent mt-0.5" aria-hidden="true" />
                <span>Lahore, Punjab, Pakistan</span>
              </div>
            </address>
            {/* Social links */}
            <div className="flex items-center gap-2" role="list" aria-label="Social media links">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  aria-label={`Follow us on ${label}`}
                  className="w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-200 focus-brand"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.shop.map((link) => (
                <li key={link.href} role="listitem">
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200 focus-brand rounded">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href} role="listitem">
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200 focus-brand rounded">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Policies</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.policies.map((link) => (
                <li key={link.href} role="listitem">
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200 focus-brand rounded">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-default py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} Shesham Wood Furniture. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400 mx-0.5" aria-hidden="true" /> for premium living
          </p>
        </div>
      </div>
    </footer>
  );
}
