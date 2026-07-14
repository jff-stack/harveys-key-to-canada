import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Route as RouteIcon } from "lucide-react";
import { PhoneShell } from "@/components/campaign/PhoneShell";
import { AppHeader } from "@/components/campaign/AppHeader";
import { CanadaMap } from "@/components/campaign/CanadaMap";
import { useCampaign } from "@/state/campaign";
import { getKeychainArt } from "@/assets/keys";
import type { Landmark } from "@/data/landmarks";

export const Route = createFileRoute("/campaign/map")({
  head: () => ({ meta: [{ title: "Key to Canada — Map" }] }),
  component: MapScreen,
});

function MapScreen() {
  const { state, completionPct } = useCampaign();
  const [active, setActive] = useState<Landmark | null>(null);

  return (
    <PhoneShell header={<AppHeader title="Canada Map" />}>
      <div className="p-4">
        <p className="mb-3 text-sm text-muted-foreground">
          Light up the True North —{" "}
          <span className="font-bold text-foreground">
            {completionPct}%
          </span>{" "}
          illuminated.
        </p>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border/60 bg-white shadow-[var(--shadow-card)]">
          {/* Fill overlay grows with completion */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
            style={{
              background:
                "linear-gradient(0deg, oklch(0.6 0.23 27 / 0.1), transparent)",
            }}
            initial={{ height: 0 }}
            animate={{ height: `${completionPct}%` }}
            transition={{ duration: 1.2 }}
          />

          <div className="absolute inset-0 z-10 flex items-center justify-center p-2">
             <CanadaMap 
               collected={state.collected} 
               onPinClick={setActive}
             />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <Legend swatch="var(--grad-canada)" label="Unlocked landmark" />
          <Legend swatch="#E4E7EB" label="Not yet collected" />
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute inset-0 z-50 flex items-end justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full overflow-hidden rounded-t-3xl bg-card shadow-[var(--shadow-float)]"
            >
              <div
                className="flex h-44 items-center justify-center"
                style={{ background: "var(--grad-canada)" }}
              >
                <img
                  src={getKeychainArt(active.art)}
                  alt={active.name}
                  width={640}
                  height={640}
                  className="h-36 w-auto animate-float drop-shadow-2xl"
                />
              </div>
              <div className="space-y-3 p-5">
                <div className="mx-auto -mt-8 mb-1 h-1.5 w-12 rounded-full bg-white/60" />
                <h3 className="font-display text-2xl font-extrabold text-foreground">
                  {active.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {active.story}
                </p>
                <div className="rounded-2xl bg-muted/60 p-3 text-sm">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-canada">
                    Harvey's nearby
                  </p>
                  <p className="mt-0.5 text-foreground">{active.harveys}</p>
                </div>
                <div className="flex items-start gap-2 rounded-2xl bg-muted/60 p-3 text-sm">
                  <RouteIcon className="mt-0.5 size-4 shrink-0 text-harveys" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                      Road trip
                    </p>
                    <p className="text-foreground">{active.roadTrip}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="w-full rounded-2xl bg-muted py-3 text-sm font-bold text-foreground"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PhoneShell>
  );
}

function Legend({
  swatch,
  label,
}: {
  swatch: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-card p-2 shadow-[var(--shadow-card)]">
      <span
        className="size-4 rounded-full"
        style={{ background: swatch }}
      />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
