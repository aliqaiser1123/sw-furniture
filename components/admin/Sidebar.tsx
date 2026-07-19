"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Layers,
  FolderOpen,
  Image as ImageIcon,
  ShoppingCart,
  Users,
  Star,
  Ticket,
  FileText,
  Search,
  MessageSquare,
  Mail,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Commerce",
    items: [
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Categories", href: "/admin/categories", icon: Layers },
      { name: "Collections", href: "/admin/collections", icon: FolderOpen },
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { name: "Customers", href: "/admin/customers", icon: Users },
      { name: "Coupons", href: "/admin/coupons", icon: Ticket },
      { name: "Reviews", href: "/admin/reviews", icon: Star },
    ],
  },
  {
    label: "Content",
    items: [
      { name: "Media Library", href: "/admin/media", icon: ImageIcon },
      { name: "Blog", href: "/admin/blog", icon: FileText },
      { name: "SEO", href: "/admin/seo", icon: Search },
      { name: "Pages", href: "/admin/pages", icon: FileText },
    ],
  },
  {
    label: "Communication",
    items: [
      { name: "Contact Messages", href: "/admin/contact", icon: MessageSquare },
      { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Users", href: "/admin/users", icon: UserCog },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground text-[10px] font-bold">SW</span>
            </div>
            <span className="truncate text-sm font-heading">Admin CMS</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/admin" className="mx-auto flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-primary-foreground text-xs font-bold">SW</span>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-border">
        <div className="px-3 space-y-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <h4 className="mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {group.label}
                </h4>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  // Active state logic for exact or subroutes
                  const isActive = item.href === "/admin" 
                    ? pathname === "/admin" 
                    : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      title={collapsed ? item.name : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        collapsed && "justify-center px-0"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
