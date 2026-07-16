import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan as ScanIcon, Radio } from "@phosphor-icons/react";
import { PhoneShell } from "@/components/campaign/PhoneShell";
import { AppHeader } from "@/components/campaign/AppHeader";
import { useCampaign, type ScanResult } from "@/state/campaign";
import { fireConfetti } from "@/lib/confetti";
import { LANDMARKS } from "@/data/landmarks";
import { getKeychainArt } from "@/assets/keys";

export const Route = createFileRoute("/campaign/scan")({
  head: () => ({ meta: [{ title: "Key to Canada — Scan" }] }),
  component: Scan,
});

type Phase = "idle" | "scanning" | "unlocked";

function Scan() {
  const { pull } = useCampaign();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("idle");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const runScan = () => {
    if (phase !== "idle") return;
    setPhase("scanning");
    setTimeout(() => {
      const result = pull();
      setScanResult(result);
      setPhase("unlocked");
      if (result.isNew) {
        fireConfetti();
      }
      setTimeout(() => navigate({ to: "/campaign/reward" }), 3000);
    }, 2200);
  };

  const lm = scanResult ? LANDMARKS.find((l) => l.id === scanResult.landmarkId) : null;
  const art = lm ? getKeychainArt(lm.art) : "";

  return (
    <PhoneShell header={<AppHeader title="Scan" back="/campaign/home" />}>
      <div className="flex flex-col items-center px-6 pt-6">
        <p className="text-center text-sm text-muted-foreground">
          Tap your keychain to the phone or scan the QR code to add a landmark to your collection.
        </p>

        {/* Scanner viewport */}
        <div className="relative mt-8 flex aspect-[3/4] w-full max-w-[300px] items-center justify-center overflow-hidden rounded-[2rem] bg-black shadow-xl">
          <div className="absolute inset-6 rounded-3xl border-2 border-white/20" />
          {/* Corner brackets */}
          {[
            "left-4 top-4 border-l-4 border-t-4",
            "right-4 top-4 border-r-4 border-t-4",
            "left-4 bottom-4 border-l-4 border-b-4",
            "right-4 bottom-4 border-r-4 border-b-4",
          ].map((c) => (
            <span
              key={c}
              className={`absolute size-10 rounded-md border-harveys ${c}`}
            />
          ))}

          {phase === "scanning" && (
            <motion.div
              className="absolute inset-x-8 h-1 rounded-full"
              style={{
                background: "var(--grad-harveys)",
                boxShadow:
                  "0 0 20px 4px oklch(0.68 0.19 47 / 0.8)",
              }}
              initial={{ top: "12%" }}
              animate={{ top: ["12%", "88%", "12%"] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          <AnimatePresence>
            {phase === "unlocked" && scanResult && lm && (
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="flex flex-col items-center text-white"
              >
                <div className="relative">
                  <img src={art} alt={lm.name} className="h-44 w-auto drop-shadow-2xl" />
                  {!scanResult.isNew && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -right-4 -top-4 flex size-10 items-center justify-center rounded-full bg-white text-lg font-bold text-black shadow-lg"
                    >
                      ×{scanResult.copyNumber}
                    </motion.div>
                  )}
                </div>
                
                {scanResult.isNew ? (
                  <div className="mt-4 text-center">
                    <span className="inline-flex rounded-full bg-canada px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">New!</span>
                    <p className="mt-2 font-display text-lg font-bold">You've unlocked the {lm.name}.</p>
                  </div>
                ) : (
                  <div className="mt-4 text-center">
                    <p className="font-display text-lg font-bold">Another {lm.name}</p>
                    <p className="text-sm text-white/80">That's your {scanResult.copyNumber}{scanResult.copyNumber === 2 ? 'nd' : scanResult.copyNumber === 3 ? 'rd' : 'th'} one.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {phase === "idle" && (
            <div className="flex flex-col items-center text-white/70">
              <ScanIcon className="size-16 text-white" weight="bold" />
              <p className="mt-2 text-sm">Ready to scan</p>
            </div>
          )}
        </div>

        <button
          onClick={runScan}
          disabled={phase !== "idle"}
          className="mt-8 flex w-full max-w-[300px] items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white shadow-[var(--shadow-float)] transition-transform active:scale-[0.98] disabled:opacity-50"
          style={{ background: "var(--grad-harveys)" }}
        >
          {phase === "scanning" ? (
            "Scanning..."
          ) : phase === "unlocked" ? (
            "Unlocked!"
          ) : (
            <>
              <Radio className="size-5" /> Simulate Scan
            </>
          )}
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Demo mode — a real keychain uses NFC/QR.
        </p>
      </div>
    </PhoneShell>
  );
}
