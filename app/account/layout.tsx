import { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { User, MapPin, Package, Heart, Settings, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export const metadata: Metadata = {
  title: "My Account | Shesham Wood Furniture",
  description: "Manage your Shesham Wood Furniture account, orders, and addresses.",
  robots: { index: false },
};

export default function AccountLayout({ children }: { children: ReactNode }) {
  const navItems = [
    { name: "Dashboard", href: "/account", icon: User },
    { name: "Addresses", href: "/account/addresses", icon: MapPin },
    { name: "Order History", href: "/account/orders", icon: Package },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Account Settings", href: "/account/settings", icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-neutral-100 hover:text-gray-900"
                >
                  <Icon className="w-5 h-5 text-gray-400" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-neutral-100">
          {children}
        </div>
      </div>
    </div>
  );
}
