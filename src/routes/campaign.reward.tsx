import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, MapPin } from "@phosphor-icons/react";
import { PhoneShell } from "@/components/campaign/PhoneShell";
import { AppHeader } from "@/components/campaign/AppHeader";
import { useCampaign } from "@/state/campaign";
import { fireConfetti } from "@/lib/confetti";
import { LANDMARKS } from "@/data/landmarks";

export const Route = createFileRoute("/campaign/reward")({
  head: () => ({ meta: [{ title: "Key to Canada — Reward" }] }),
  component: RewardReveal,
});

import { getKeychainArt } from "@/assets/keys";

function RewardReveal() {
  const { lastScan } = useCampaign();
  const navigate = useNavigate();
  const scan = lastScan;
  const landmark = scan
    ? LANDMARKS.find((l) => l.id === scan.landmarkId)
    : null;

  useEffect(() => {
    if (!scan) return;
    if (scan.unlockedReward) {
      const t = setTimeout(fireConfetti, 400);
      return () => clearTimeout(t);
    }
  }, [scan]);

  if (!scan || !landmark) {
    return (
      <PhoneShell
        header={<AppHeader title="Reward" back="/campaign/home" />}
      >
        <div className="flex flex-col items-center justify-center gap-4 px-6 pt-24 text-center">
          <span className="text-5xl">🎁</span>
          <p className="text-sm text-muted-foreground">
            No reward yet — scan a keychain to collect a landmark.
          </p>
          <Link
            to="/campaign/scan"
            className="rounded-2xl px-6 py-3 text-sm font-bold text-white"
            style={{ background: "var(--grad-harveys)" }}
          >
            Go to Scan
          </Link>
        </div>
      </PhoneShell>
    );
  }

  const reward = scan.unlockedReward;
  const art = getKeychainArt(landmark.art);

  return (
    <PhoneShell
      header={<AppHeader title={reward ? "Your Reward" : "Scan Result"} back="/campaign/home" />}
    >
      <div className="flex flex-col items-center px-6 pt-4">
        <p className="text-sm font-semibold text-canada">
          {scan.isNew ? `You unlocked ${landmark.name}!` : `You scanned another ${landmark.name}!`}
        </p>

        {/* Reward card — shown if a reward was earned at this purchase count */}
        {reward ? (
          <motion.div
            initial={{ rotateY: 180, opacity: 0, scale: 0.8 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mt-6 aspect-[3/4.2] w-full max-w-[300px] overflow-hidden rounded-[1.8rem] p-1"
            style={{
              background: "var(--grad-harveys)",
              boxShadow: "var(--shadow-float)",
            }}
          >
            <div className="relative flex h-full flex-col items-center justify-center rounded-[1.6rem] bg-card p-6 text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Reward Earned
              </span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                className="my-4 text-7xl"
              >
                {reward.emoji}
              </motion.span>
              <h2 className="font-display text-3xl font-extrabold text-foreground">
                {reward.label}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Available to claim now
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                <img
                  src={art}
                  alt=""
                  width={640}
                  height={640}
                  className="size-6 object-contain"
                />
                <span className="text-xs font-semibold text-foreground">
                  {scan.isNew ? "Added to collection" : `Added to collection (×${scan.copyNumber})`}
                </span>
              </div>

              {/* Redemption microcopy */}
              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                Redeem by placing a mobile pre-order for in-store pickup,
                or scan the reward code at the in-store counter. Not
                valid on delivery orders.
              </p>
            </div>
          </motion.div>
        ) : (
          /* No reward at this purchase tier — just show landmark unlock */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-6 flex w-full max-w-[300px] flex-col items-center rounded-3xl bg-card p-8 text-center shadow-[var(--shadow-float)]"
          >
            <div className="flex size-20 items-center justify-center rounded-full bg-canada/15">
              <MapPin className="size-10 text-canada" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-foreground">
              {scan.isNew ? "Keychain Unlocked!" : "Duplicate Scanned!"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {scan.isNew 
                ? `${landmark.name} has been added to your collection. Keep buying combos to earn your next reward!`
                : `You already have ${landmark.name}, but this scan still counts towards your next reward!`
              }
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
              <img
                src={art}
                alt=""
                width={640}
                height={640}
                className="size-6 object-contain"
              />
              <span className="text-xs font-semibold text-foreground">
                {scan.isNew ? "Added to collection" : `Duplicate ×${scan.copyNumber}`}
              </span>
            </div>
          </motion.div>
        )}

        <div className="mt-8 grid w-full max-w-[300px] gap-3">
          {reward && (
            <button
              onClick={() => navigate({ to: "/campaign/home" })}
              className="flex items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white shadow-[var(--shadow-float)] active:scale-[0.98]"
              style={{ background: "var(--grad-harveys)" }}
            >
              <Check className="size-5" /> Done
            </button>
          )}
          <button
            onClick={() => navigate({ to: "/campaign/collection" })}
            className="rounded-2xl bg-muted py-4 text-base font-bold text-foreground active:scale-[0.98]"
          >
            View Collection
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}
