"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/common/SearchBox";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    label: "Shop",
    href: "/shop",
    megaMenu: true,
    categories: [
      { label: "Living Room", href: "/shop?category=living-room" },
      { label: "Bedroom", href: "/shop?category=bedroom" },
      { label: "Dining Room", href: "/shop?category=dining-room" },
      { label: "Office", href: "/shop?category=office" },
      { label: "Outdoor", href: "/shop?category=outdoor" },
      { label: "Decor", href: "/shop?category=decor" },
    ],
  },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setMegaMenuOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm py-2"
            : pathname === "/" 
              ? "bg-transparent py-6" 
              : "bg-background/80 backdrop-blur-sm py-4"
        )}
        role="banner"
      >
        <div className="container-default">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 focus-brand rounded-md group"
              aria-label="Shesham Wood Furniture — Home"
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                <span className="text-primary-foreground font-bold text-lg">SW</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-heading text-2xl font-bold text-foreground leading-none tracking-tight">
                  Shesham Wood
                </div>
                <div className="text-[11px] text-muted-foreground tracking-[0.2em] uppercase leading-none mt-1">
                  Premium Furniture
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.megaMenu && setMegaMenuOpen(link.label)}
                  onMouseLeave={() => setMegaMenuOpen(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus-brand",
                      pathname === link.href
                        ? "text-primary bg-primary/8"
                        : "text-foreground/80 hover:text-foreground hover:bg-secondary/80"
                    )}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                    {link.megaMenu && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          megaMenuOpen === link.label && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </Link>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {link.megaMenu && megaMenuOpen === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-xl shadow-lg p-3 grid grid-cols-2 gap-1"
                        role="menu"
                      >
                        {link.categories?.map((cat) => (
                          <Link
                            key={cat.label}
                            href={cat.href}
                            role="menuitem"
                            className="px-3 py-2.5 text-sm rounded-lg hover:bg-secondary text-foreground/80 hover:text-foreground transition-colors duration-150 focus-brand"
                          >
                            {cat.label}
                          </Link>
                        ))}
                        <Link
                          href="/shop"
                          role="menuitem"
                          className="col-span-2 px-3 py-2.5 text-sm rounded-lg bg-primary/8 hover:bg-primary/15 text-primary font-medium transition-colors duration-150 focus-brand text-center"
                        >
                          View All Products →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors duration-200 focus-brand"
                aria-label={searchOpen ? "Close search" : "Open search"}
                aria-expanded={searchOpen}
              >
                {searchOpen ? <X className="w-4.5 h-4.5" /> : <Search className="w-4.5 h-4.5" />}
              </button>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors duration-200 focus-brand"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                </button>
              )}

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors duration-200 focus-brand relative"
                aria-label="Wishlist"
              >
                <Heart className="w-4.5 h-4.5" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors duration-200 focus-brand relative"
                aria-label="Shopping cart (0 items)"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground rounded-full text-[9px] font-bold flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Login */}
              <Button
                asChild
                size="sm"
                className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground ml-1 h-9"
              >
                <Link href="/login" aria-label="Login to your account">
                  <User className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                  Login
                </Link>
              </Button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors duration-200 focus-brand ml-1"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Search Bar (expandable) */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pb-4 pt-1">
                  <SearchBox
                    autoFocus
                    onClose={() => setSearchOpen(false)}
                    placeholder="Search for furniture, categories, collections…"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Spacer for fixed header (only on non-home pages since home has transparent over hero) */}
      {pathname !== "/" && <div className="h-24 md:h-28" aria-hidden="true" />}

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-background border-l border-border shadow-2xl z-50 flex flex-col lg:hidden"
              role="dialog"
              aria-label="Mobile navigation menu"
              aria-modal="true"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-border/60">
                <span className="font-heading text-lg font-semibold">Navigation</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors focus-brand"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-border/40">
                <SearchBox placeholder="Search furniture…" />
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 focus-brand",
                        pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:bg-secondary"
                      )}
                      aria-current={pathname === link.href ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                    {link.megaMenu && link.categories && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.categories.map((cat) => (
                          <Link
                            key={cat.label}
                            href={cat.href}
                            className="flex items-center px-4 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-brand"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Bottom actions */}
              <div className="p-4 border-t border-border/60 space-y-3">
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/login">
                    <User className="w-4 h-4 mr-2" aria-hidden="true" />
                    Login / Register
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Link href="/wishlist" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                      Wishlist
                    </Button>
                  </Link>
                  <Link href="/cart" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <ShoppingCart className="w-4 h-4 mr-2" aria-hidden="true" />
                      Cart (0)
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
