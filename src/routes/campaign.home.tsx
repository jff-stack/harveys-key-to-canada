import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Gift, Scan, GridNine, CaretRight, Trophy } from "@phosphor-icons/react";
import { PhoneShell } from "@/components/campaign/PhoneShell";
import { AppHeader } from "@/components/campaign/AppHeader";
import { ProgressRing } from "@/components/campaign/ProgressRing";
import { useCampaign } from "@/state/campaign";
import { getKeychainArt } from "@/assets/keys";

export const Route = createFileRoute("/campaign/home")({
  head: () => ({ meta: [{ title: "Key to Canada — Home" }] }),
  component: HomeDashboard,
});

function HomeDashboard() {
  const {
    landmarks,
    completionPct,
    collectedCount,
    state,
    isCollected,
    nextReward,
    purchasesUntilNextReward,
    missingLandmarks,
    drawEligible,
  } = useCampaign();

  const remaining = missingLandmarks;

  return (
    <PhoneShell header={<AppHeader title="Key to Canada" />}>
      <div className="space-y-5 p-4">
        {/* Hero progress card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-5 text-white shadow-[var(--shadow-float)]"
          style={{ background: "var(--grad-canada)" }}
        >
          <div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <ProgressRing value={completionPct} size={128}>
              <span className="font-display text-3xl font-extrabold">
                {collectedCount}/8
              </span>
              <span className="text-[11px] font-semibold text-white/80">
                landmarks
              </span>
            </ProgressRing>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">
                Your collection
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold leading-tight">
                {drawEligible
                  ? "All 8 collected!"
                  : `You've collected ${collectedCount} of 8`}
              </p>
              <p className="mt-1 text-sm text-white/85">
                {drawEligible ? (
                  "You're entered into the Grand Prize draw! 🎉"
                ) : remaining.length <= 2 ? (
                  <>
                    You're {remaining.length} away!{" "}
                    <span className="font-semibold">
                      Missing:{" "}
                      {remaining.map((l) => l.name).join(" & ")}
                    </span>
                  </>
                ) : (
                  "Keep collecting to light up the map."
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stat row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-harveys/15 text-harveys">
              <Gift className="size-5" />
            </span>
            <div>
              <p className="font-display text-xl font-extrabold text-foreground">
                {state.purchaseCount}
              </p>
              <p className="text-xs text-muted-foreground">combos bought</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-canada/15 text-canada">
              <Trophy className="size-5" />
            </span>
            <div>
              <p className="font-display text-sm font-extrabold text-foreground">
                {drawEligible ? "Entered!" : `${remaining.length} to go`}
              </p>
              <p className="text-xs text-muted-foreground">grand prize</p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/campaign/scan"
            className="flex flex-col items-start gap-3 rounded-2xl p-4 text-white shadow-[var(--shadow-float)] transition-transform active:scale-[0.98]"
            style={{ background: "var(--grad-harveys)" }}
          >
            <Scan className="size-7" weight="bold" />
            <span className="font-display text-base font-bold">
              Quick Scan
            </span>
          </Link>
          <Link
            to="/campaign/collection"
            className="flex flex-col items-start gap-3 rounded-2xl bg-card p-4 text-foreground shadow-[var(--shadow-card)] transition-transform active:scale-[0.98]"
          >
            <GridNine className="size-7 text-canada" weight="bold" />
            <span className="font-display text-base font-bold">
              View Collection
            </span>
          </Link>
        </div>

        {/* Next reward from roadmap */}
        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-harveys/40 bg-harveys/5 p-4">
          <span className="flex size-10 items-center justify-center rounded-full bg-harveys/15 text-harveys">
            <Gift className="size-5" />
          </span>
          <div className="flex-1">
            {nextReward ? (
              <>
                <p className="text-sm font-bold text-foreground">
                  Next reward: {nextReward.emoji} {nextReward.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {purchasesUntilNextReward} more combo
                  {purchasesUntilNextReward !== 1 ? "s" : ""} to unlock
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-foreground">
                  All rewards earned! 🎉
                </p>
                <p className="text-xs text-muted-foreground">
                  You've unlocked every reward on the roadmap.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Remaining landmarks */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-foreground">
              Still to collect
            </h3>
            <Link
              to="/campaign/collection"
              className="flex items-center gap-1 text-sm font-semibold text-harveys"
            >
              All <CaretRight className="size-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {remaining.map((l) => (
              <div key={l.id} className="w-24 shrink-0 text-center">
                <div className="flex h-24 items-center justify-center rounded-2xl bg-muted">
                  <img
                    src={getKeychainArt(l.art)}
                    alt={l.name}
                    width={640}
                    height={640}
                    loading="lazy"
                    className="h-20 w-auto opacity-40 brightness-0"
                  />
                </div>
                <p className="mt-1 truncate text-xs font-medium text-muted-foreground">
                  {l.name}
                </p>
              </div>
            ))}
            {remaining.length === 0 && (
              <div className="w-full rounded-2xl bg-card p-4 text-center text-sm text-muted-foreground shadow-[var(--shadow-card)]">
                🎉 You collected every landmark!
              </div>
            )}
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
