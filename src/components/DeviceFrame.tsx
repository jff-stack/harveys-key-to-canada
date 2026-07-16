import type { ReactNode } from "react";

export default function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] w-full bg-stone-200 dark:bg-stone-950 md:grid md:place-items-center md:py-10">
      <div
        className="
          relative flex h-[100dvh] w-full flex-col overflow-hidden bg-stone-50 dark:bg-stone-900
          md:h-[844px] md:w-[390px] md:rounded-[2.5rem] md:shadow-[0_20px_60px_rgb(0,0,0,0.15)]
          md:ring-[10px] md:ring-stone-900 dark:md:ring-stone-800
        "
      >
        {/* notch — desktop only */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-50 hidden h-5 w-28 -translate-x-1/2 rounded-b-[0.85rem] bg-stone-900 md:block dark:bg-stone-800" />
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
      <div className="fixed bottom-2 left-0 right-0 pointer-events-none text-center text-xs text-stone-400 dark:text-stone-600">
        created by Jason Francis, Team 64
      </div>
    </div>
  );
}
