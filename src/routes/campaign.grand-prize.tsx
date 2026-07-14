import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Lock, Check, Clock, Gift } from "lucide-react";
import { PhoneShell } from "@/components/campaign/PhoneShell";
import { AppHeader } from "@/components/campaign/AppHeader";
import { useCampaign } from "@/state/campaign";
import { GRAND_PRIZE } from "@/data/rewards";
import { REWARD_TIERS } from "@/data/rewards";
import lakelouise from "@/assets/landmark-lakelouise.png";

export const Route = createFileRoute("/campaign/grand-prize")({
  head: () => ({ meta: [{ title: "Key to Canada — Grand Prize" }] }),
  component: GrandPrize,
});

function GrandPrize() {
  const {
    landmarks,
    isCollected,
    completionPct,
    collectedCount,
    drawEligible,
    earnedRewards,
    state,
  } = useCampaign();
  const remaining = 8 - collectedCount;

  return (
    <PhoneShell header={<AppHeader title="Grand Prize" />}>
      <div className="space-y-5 p-4">
        {/* Prize hero */}
        <div className="relative overflow-hidden rounded-3xl text-white shadow-[var(--shadow-float)]">
          <div
            className="flex h-40 items-center justify-center"
            style={{ background: "var(--grad-aurora)" }}
          >
            <img
              src={lakelouise}
              alt="Lake Louise"
              width={640}
              height={640}
              className="h-32 w-auto animate-float drop-shadow-2xl"
            />
          </div>
          <div className="bg-card p-5 text-foreground">
            <span className="inline-flex items-center gap-1 rounded-full bg-canada/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-canada">
              <Trophy className="size-3" /> Grand Prize Draw
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold">
              {GRAND_PRIZE.title}
            </h2>
            <p className="text-sm font-semibold text-harveys">
              {GRAND_PRIZE.destination}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {GRAND_PRIZE.blurb}
            </p>
            <p className="mt-2 text-xs italic text-muted-foreground">
              {GRAND_PRIZE.drawNotice}
            </p>
          </div>
        </div>

        {/* Entry progress */}
        <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg font-bold text-foreground">
              Your entry progress
            </p>
            <span className="font-display text-lg font-extrabold text-harveys">
              {collectedCount}/8
            </span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--grad-harveys)" }}
              initial={{ width: 0 }}
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {drawEligible
              ? "🎉 You're entered into the draw! Winner announced at campaign end."
              : `${remaining} more landmark${remaining > 1 ? "s" : ""} to enter the draw.`}
          </p>
        </div>

        {/* 8-slot roadmap with reward tiers interleaved */}
        <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="mb-3 font-display text-lg font-bold text-foreground">
            The road to the Rockies
          </p>
          <div className="space-y-1">
            {landmarks.map((l, i) => {
              const done = isCollected(l.id);
              return (
                <div key={l.id} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex size-8 items-center justify-center rounded-full ${done ? "text-white" : "bg-muted text-muted-foreground"}`}
                      style={
                        done
                          ? { background: "var(--grad-harveys)" }
                          : undefined
                      }
                    >
                      {done ? (
                        <Check className="size-4" strokeWidth={3} />
                      ) : (
                        <Lock className="size-3.5" />
                      )}
                    </span>
                    {i < landmarks.length - 1 && (
                      <span
                        className={`h-6 w-0.5 ${done ? "bg-harveys" : "bg-muted"}`}
                      />
                    )}
                  </div>
                  <p
                    className={`text-sm ${done ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {l.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reward roadmap */}
        <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <Gift className="size-5 text-harveys" /> Reward milestones
          </p>
          <div className="space-y-2">
            {REWARD_TIERS.map((tier) => {
              const earned = state.purchaseCount >= tier.atPurchase;
              return (
                <div
                  key={tier.atPurchase}
                  className={`flex items-center gap-3 rounded-xl p-2 ${earned ? "bg-harveys/10" : ""}`}
                >
                  <span className="w-8 text-center text-lg">
                    {earned ? tier.emoji : "🔒"}
                  </span>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${earned ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                    >
                      {tier.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      At purchase #{tier.atPurchase}
                    </p>
                  </div>
                  {earned && (
                    <Check className="size-4 text-harveys" strokeWidth={3} />
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Redeem rewards by placing a mobile pre-order for in-store
            pickup, or scan the code at the counter. Not valid on delivery
            orders.
          </p>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-3 rounded-2xl bg-canada/10 p-4">
          <Clock className="size-5 text-canada" />
          <div>
            <p className="text-sm font-bold text-foreground">
              Campaign ends September 1, 2026
            </p>
            <p className="text-xs text-muted-foreground">
              Collect all 8 landmarks before then to enter the draw
            </p>
          </div>
        </div>

        {/* You're entered confirmation */}
        {drawEligible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl p-5 text-center text-white shadow-[var(--shadow-float)]"
            style={{ background: "var(--grad-canada)" }}
          >
            <span className="text-4xl">🎉</span>
            <h3 className="mt-2 font-display text-xl font-extrabold">
              You're entered!
            </h3>
            <p className="mt-1 text-sm text-white/85">
              All 8 landmarks collected. You're in the draw for the
              all-expenses-paid trip for two to Calgary & Lake Louise.
              Winner drawn at campaign end.
            </p>
          </motion.div>
        )}

        {!drawEligible && (
          <Link
            to="/campaign/scan"
            className="flex w-full items-center justify-center rounded-2xl py-4 text-base font-bold text-white shadow-[var(--shadow-float)]"
            style={{ background: "var(--grad-harveys)" }}
          >
            Collect the next landmark
          </Link>
        )}
      </div>
    </PhoneShell>
  );
}
