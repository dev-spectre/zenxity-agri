"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { navigationItems } from "./SidebarNav";

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  // For mobile, maybe we only want to show the top 5 links to avoid overcrowding.
  const mobileNavItems = navigationItems.slice(0, 5);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border grid grid-cols-5 justify-items-center items-center z-50 h-16 px-2 pb-safe shadow-lg">
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full py-2 space-y-0.5 transition-colors duration-200 ${
              isActive ? "text-primary font-semibold" : "text-muted-foreground"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""}`} />
            <span className="text-[9px] max-w-full px-0.5 text-center leading-none truncate">{t(item.label)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
