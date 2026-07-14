import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Grid3x3, Map, ScanLine, Trophy, User } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DemoPill } from "@/components/campaign/DemoPill";

const TABS = [
  { to: "/campaign/home", label: "Home", icon: Home },
  { to: "/campaign/collection", label: "Collect", icon: Grid3x3 },
  { to: "/campaign/scan", label: "Scan", icon: ScanLine },
  { to: "/campaign/map", label: "Map", icon: Map },
  { to: "/campaign/grand-prize", label: "Prize", icon: Trophy },
  { to: "/campaign/profile", label: "You", icon: User },
];

export function CampaignTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="glass sticky bottom-0 z-30 flex items-stretch justify-between rounded-t-3xl px-2 pb-[env(safe-area-inset-bottom)] pt-2">
      {TABS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        const scan = to === "/campaign/scan";
        return (
          <Link
            key={to}
            to={to}
            className="flex flex-1 flex-col items-center gap-1 py-1.5"
          >
            {scan ? (
              <span
                className={cn(
                  "-mt-6 flex size-14 items-center justify-center rounded-full text-white shadow-[var(--shadow-float)] transition-transform active:scale-95",
                )}
                style={{ background: "var(--grad-harveys)" }}
              >
                <Icon className="size-6" strokeWidth={2.4} />
              </span>
            ) : (
              <Icon
                className={cn(
                  "size-5 transition-colors",
                  active ? "text-harveys" : "text-muted-foreground",
                )}
                strokeWidth={active ? 2.6 : 2}
              />
            )}
            <span
              className={cn(
                "text-[10px] font-semibold tracking-tight",
                active ? "text-harveys" : "text-muted-foreground",
                scan && "text-harveys",
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function PhoneShell({
  children,
  header,
}: {
  children: ReactNode;
  header?: ReactNode;
}) {
  return (
    <div className="relative flex h-full w-full flex-col bg-background">
      <MapleParticles />
      {header}
      <main className="relative z-10 flex-1 overflow-y-auto pb-4">
        {children}
      </main>
      <CampaignTabBar />
      <DemoPill />
    </div>
  );
}



function MapleParticles() {
  const leaves = Array.from({ length: 7 });
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {leaves.map((_, i) => (
        <span
          key={i}
          className="absolute text-canada/20"
          style={{
            left: `${(i * 14 + 6) % 100}%`,
            fontSize: `${12 + (i % 3) * 6}px`,
            animation: `maple-fall ${9 + (i % 4) * 2}s linear ${i * 1.6}s infinite`,
          }}
        >
          🍁
        </span>
      ))}
    </div>
  );
}
