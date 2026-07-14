import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw } from "lucide-react";
import { useCampaign } from "@/state/campaign";
import { LANDMARKS, type LandmarkId } from "@/data/landmarks";

/**
 * Hidden developer drawer.
 * Activated by long-pressing the Harvey's logo in AppHeader
 * or by adding ?dev=1 to the URL.
 */
export function DevDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    state,
    setPurchaseCount,
    toggleCollected,
    isCollected,
    seedDemo,
    reset,
  } = useCampaign();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-[60] flex items-end justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-t-3xl bg-card p-5 shadow-[var(--shadow-float)]"
            style={{ maxHeight: "80%" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-foreground">
                🛠 Dev Controls
              </h3>
              <button
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-full bg-muted text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Purchase count */}
            <div className="mb-4">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Purchase count: {state.purchaseCount}
              </label>
              <input
                type="range"
                min={0}
                max={20}
                value={state.purchaseCount}
                onChange={(e) => setPurchaseCount(Number(e.target.value))}
                className="w-full accent-harveys"
              />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>0</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
              </div>
            </div>

            {/* Landmark toggles */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Collected landmarks
              </p>
              <div className="grid grid-cols-2 gap-2">
                {LANDMARKS.map((l) => {
                  const collected = isCollected(l.id);
                  return (
                    <button
                      key={l.id}
                      onClick={() => toggleCollected(l.id)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors ${
                        collected
                          ? "bg-harveys/15 text-harveys"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span>{collected ? "✓" : "○"}</span>
                      <span className="truncate">{l.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex gap-2">
              <button
                onClick={seedDemo}
                className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white"
                style={{ background: "var(--grad-harveys)" }}
              >
                Demo State (6/8, 9 purchases)
              </button>
              <button
                onClick={reset}
                className="flex items-center justify-center gap-1 rounded-xl bg-muted px-4 py-2.5 text-sm font-semibold text-foreground"
              >
                <RotateCcw className="size-4" />
                Reset
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook that checks for ?dev=1 in the URL.
 */
export function useDevMode(): boolean {
  const [isDev, setIsDev] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsDev(params.get("dev") === "1");
    }
  }, []);
  return isDev;
}
