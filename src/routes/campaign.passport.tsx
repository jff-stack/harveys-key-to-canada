import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PhoneShell } from "@/components/campaign/PhoneShell";
import { AppHeader } from "@/components/campaign/AppHeader";
import { useCampaign } from "@/state/campaign";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campaign/passport")({
  head: () => ({ meta: [{ title: "Key to Canada — Passport" }] }),
  component: Passport,
});

function Passport() {
  const { landmarks, isCollected, collectedSet } = useCampaign();

  return (
    <PhoneShell
      header={
        <AppHeader title="Canadian Passport" back="/campaign/profile" />
      }
    >
      <div className="p-4">
        {/* Passport cover */}
        <div
          className="relative mb-4 overflow-hidden rounded-3xl p-6 text-white shadow-[var(--shadow-float)]"
          style={{
            background:
              "linear-gradient(145deg, oklch(0.34 0.09 25), oklch(0.25 0.08 25))",
          }}
        >
          <div className="absolute inset-3 rounded-2xl border border-gold/40" />
          <div className="relative text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Passport
            </p>
            <p className="mt-6 text-5xl">🍁</p>
            <p className="mt-6 font-display text-lg font-bold tracking-wide text-gold">
              CANADA
            </p>
            <p className="text-xs text-white/60">
              Key to Canada · Explorer Edition
            </p>
          </div>
        </div>

        {/* Stamp pages */}
        <div className="rounded-3xl bg-[oklch(0.96_0.02_85)] p-5 shadow-[var(--shadow-card)] dark:bg-[oklch(0.28_0.02_85)]">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-canada">
            Entry Stamps
          </p>
          <div className="grid grid-cols-3 gap-3">
            {landmarks.map((l) => {
              const done = isCollected(l.id);
              return (
                <motion.div
                  key={l.id}
                  initial={
                    done ? { scale: 1.4, opacity: 0, rotate: -12 } : false
                  }
                  animate={{
                    scale: 1,
                    opacity: 1,
                    rotate: done ? -6 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 12,
                  }}
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center rounded-full border-2 p-2 text-center",
                    done
                      ? "border-canada/70 text-canada"
                      : "border-dashed border-muted-foreground/30 text-muted-foreground/40",
                  )}
                  style={
                    done
                      ? {
                          boxShadow:
                            "inset 0 0 0 2px color-mix(in oklab, currentColor 20%, transparent)",
                        }
                      : undefined
                  }
                >
                  {done ? (
                    <>
                      <span className="text-2xl leading-none">🍁</span>
                      <span className="mt-1 text-[8px] font-bold uppercase leading-tight">
                        {l.provinceCode}
                      </span>
                    </>
                  ) : (
                    <span className="text-[9px] font-semibold uppercase">
                      Empty
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Each landmark you collect stamps your passport. Fill every page
            to enter the Grand Prize draw.
          </p>
        </div>
      </div>
    </PhoneShell>
  );
}
