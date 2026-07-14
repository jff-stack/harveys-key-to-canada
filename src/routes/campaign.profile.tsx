import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BookMarked,
  Share2,
  Gift,
  ChevronRight,
  Trophy,
  MapPin,
  Mail,
} from "lucide-react";
import { PhoneShell } from "@/components/campaign/PhoneShell";
import { AppHeader } from "@/components/campaign/AppHeader";
import { ProgressRing } from "@/components/campaign/ProgressRing";
import { useCampaign } from "@/state/campaign";

export const Route = createFileRoute("/campaign/profile")({
  head: () => ({ meta: [{ title: "Key to Canada — Profile" }] }),
  component: Profile,
});

function Profile() {
  const {
    state,
    completionPct,
    collectedCount,
    drawEligible,
    earnedRewards,
  } = useCampaign();

  const badges = [
    { emoji: "🍁", label: "First Scan", on: collectedCount > 0 },
    { emoji: "🗺️", label: "Coast to Coast", on: completionPct >= 50 },
    { emoji: "🏆", label: "Completionist", on: completionPct === 100 },
    { emoji: "🎁", label: "Reward Pro", on: earnedRewards.length >= 3 },
    { emoji: "🍟", label: "Fries Unlocked", on: state.purchaseCount >= 8 },
    {
      emoji: "✈️",
      label: "Draw Entered",
      on: drawEligible,
    },
  ];

  return (
    <PhoneShell header={<AppHeader title="Profile" />}>
      <div className="space-y-5 p-4">
        {/* Explorer card */}
        <div
          className="relative overflow-hidden rounded-3xl p-5 text-white shadow-[var(--shadow-float)]"
          style={{ background: "var(--grad-canada)" }}
        >
          <div className="absolute -right-6 -top-6 size-36 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <ProgressRing
              value={completionPct}
              size={96}
              stroke={9}
              gradientId="profile-ring"
            >
              <span className="text-3xl">🍁</span>
            </ProgressRing>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">
                Canadian Explorer
              </p>
              <p className="font-display text-2xl font-extrabold">
                {completionPct}% Complete
              </p>
              <p className="text-sm text-white/85">
                {collectedCount} of 8 landmarks · {state.purchaseCount}{" "}
                combos
              </p>
              <p className="mt-1 text-xs text-white/70">
                {earnedRewards.length} reward
                {earnedRewards.length !== 1 ? "s" : ""} earned
              </p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          <Stat
            icon={<MapPin className="size-5 text-canada" />}
            value={`${collectedCount}/8`}
            label="Landmarks"
          />
          <Stat
            icon={<Gift className="size-5 text-harveys" />}
            value={state.purchaseCount}
            label="Combos"
          />
          <Stat
            icon={<Trophy className="size-5 text-gold-deep" />}
            value={earnedRewards.length}
            label="Rewards"
          />
        </div>

        {/* Badges */}
        <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="mb-3 font-display text-lg font-bold text-foreground">
            Achievement badges
          </p>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((b) => (
              <motion.div
                key={b.label}
                whileTap={{ scale: 0.94 }}
                className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-center ${b.on ? "bg-muted" : "opacity-40"}`}
              >
                <span className="text-2xl">{b.on ? b.emoji : "🔒"}</span>
                <span className="text-[10px] font-semibold text-foreground">
                  {b.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)]">
          <Row
            to="/campaign/passport"
            icon={<BookMarked className="size-5 text-canada" />}
            label="Canadian Passport"
          />
          <Row
            to="/campaign/grand-prize"
            icon={<Trophy className="size-5 text-harveys" />}
            label="Grand Prize Progress"
          />
          <button className="flex w-full items-center gap-3 border-t border-border/60 px-4 py-4 text-left">
            <Share2 className="size-5 text-aurora-2" />
            <span className="flex-1 text-sm font-semibold text-foreground">
              Share my collection
            </span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        </div>

        <Link
          to="/campaign/design-system"
          className="block text-center text-xs font-semibold text-harveys"
        >
          View design system & UX rationale →
        </Link>
      </div>
    </PhoneShell>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
      {icon}
      <span className="font-display text-xl font-extrabold text-foreground">
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function Row({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-4 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-border/60"
    >
      {icon}
      <span className="flex-1 text-sm font-semibold text-foreground">
        {label}
      </span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </Link>
  );
}
