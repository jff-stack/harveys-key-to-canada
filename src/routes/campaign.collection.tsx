import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Check, Mail } from "lucide-react";
import { PhoneShell } from "@/components/campaign/PhoneShell";
import { AppHeader } from "@/components/campaign/AppHeader";
import { DigitalPostcard } from "@/components/campaign/DigitalPostcard";
import { useCampaign } from "@/state/campaign";
import { cn } from "@/lib/utils";
import type { Landmark } from "@/data/landmarks";
import { getKeychainArt } from "@/assets/keys";

export const Route = createFileRoute("/campaign/collection")({
  head: () => ({ meta: [{ title: "Key to Canada — Collection" }] }),
  component: Collection,
});

function Collection() {
  const { landmarks, isCollected, getCopyCount, completionPct } = useCampaign();
  const [active, setActive] = useState<Landmark | null>(null);
  const [postcardLandmark, setPostcardLandmark] = useState<Landmark | null>(
    null,
  );

  if (postcardLandmark) {
    return (
      <PhoneShell
        header={<AppHeader title="Postcard" back="/campaign/collection" />}
      >
        <div className="p-4">
          <DigitalPostcard
            landmark={postcardLandmark}
            onClose={() => setPostcardLandmark(null)}
          />
        </div>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell header={<AppHeader title="Collection" />}>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
          <div>
            <p className="font-display text-2xl font-extrabold text-foreground">
              {completionPct}%
            </p>
            <p className="text-xs text-muted-foreground">
              of Canada collected
            </p>
          </div>
          <div className="mx-4 h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--grad-harveys)" }}
              initial={{ width: 0 }}
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {landmarks.map((l, i) => {
            const collected = isCollected(l.id);
            const count = getCopyCount(l.id);
            const art = getKeychainArt(l.art);

            return (
              <motion.button
                key={l.id}
                onClick={() => setActive(l)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative overflow-hidden rounded-3xl bg-card p-3 text-left shadow-[var(--shadow-card)]"
              >
                <div className="relative flex h-28 items-center justify-center">
                  <img
                    src={art}
                    alt={l.name}
                    width={640}
                    height={640}
                    loading="lazy"
                    className={cn(
                      "h-full w-auto object-contain transition-all duration-500",
                      collected
                        ? "animate-float drop-shadow-lg"
                        : "opacity-40 brightness-0" // CSS silhouette
                    )}
                  />
                  {!collected && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Lock className="size-6 text-muted-foreground/60" />
                    </span>
                  )}
                </div>
                <div className="relative mt-1">
                  <p className="font-display text-sm font-bold text-foreground">
                    {collected ? l.name : "???"}
                  </p>
                  <p className="text-xs text-muted-foreground">{l.province}</p>
                </div>
                {collected && count > 1 && (
                  <span className="absolute left-3 top-3 flex items-center justify-center rounded-full bg-white px-2 py-0.5 text-xs font-extrabold text-harveys shadow-md">
                    ×{count}
                  </span>
                )}
                {collected && (
                  <span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-harveys text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Detail bottom sheet */}
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
              initial={{ y: 40, opacity: 0, rotateX: 20 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-t-3xl bg-card p-6 shadow-[var(--shadow-float)]"
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />
              <div className="flex items-center justify-center relative">
                <img
                  src={getKeychainArt(active.art)}
                  alt={active.name}
                  width={640}
                  height={640}
                  className={cn(
                    "h-40 w-auto",
                    isCollected(active.id)
                      ? "animate-float drop-shadow-xl"
                      : "opacity-40 brightness-0"
                  )}
                />
                {isCollected(active.id) && getCopyCount(active.id) > 1 && (
                  <span className="absolute -right-2 top-0 flex items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-extrabold text-harveys shadow-lg">
                    ×{getCopyCount(active.id)}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-foreground">
                {isCollected(active.id) ? active.name : "Locked Landmark"}
              </h3>
              <p className="text-sm font-semibold text-canada">
                {active.location}
              </p>

              {isCollected(active.id) ? (
                <div className="mt-4 space-y-3 text-sm">
                  <Fact label="Did you know" value={active.fact} />
                  <Fact
                    label="Harvey's connection"
                    value={active.harveys}
                  />
                  <Fact label="Fun trivia" value={active.trivia} />
                  {/* View Postcard button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActive(null);
                      setPostcardLandmark(active);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-white shadow-lg"
                    style={{ background: "var(--grad-harveys)" }}
                  >
                    <Mail className="size-4" />
                    View Postcard
                  </button>
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  Buy a qualifying combo and scan its keychain to unlock
                  this landmark and reveal its story.
                </p>
              )}
              <button
                onClick={() => setActive(null)}
                className="mt-5 w-full rounded-2xl bg-muted py-3 text-sm font-bold text-foreground"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PhoneShell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/60 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-foreground">{value}</p>
    </div>
  );
}
