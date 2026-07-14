import type { ReactNode } from "react";

export default function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] w-full bg-neutral-100 dark:bg-neutral-950 md:grid md:place-items-center md:py-10">
      <div
        className="
          relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white dark:bg-neutral-900
          md:h-[844px] md:w-[390px] md:rounded-[3rem] md:shadow-2xl
          md:ring-[10px] md:ring-neutral-900 dark:md:ring-neutral-800
        "
      >
        {/* notch — desktop only */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-50 hidden h-7 w-36 -translate-x-1/2 rounded-b-2xl bg-neutral-900 md:block dark:bg-neutral-800" />
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}
