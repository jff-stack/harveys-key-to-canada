import { useState } from "react";
import { Faders, ArrowCounterClockwise, Scan, FastForward, Trophy } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useCampaign } from "@/state/campaign";

export function DemoPill() {
  const [open, setOpen] = useState(false);
  const { reset, pull, loadPitchState, completeAll } = useCampaign();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-[80px] right-4 z-50 flex size-12 items-center justify-center rounded-full bg-black/80 text-white shadow-xl backdrop-blur-md transition-transform active:scale-95"
      >
        <Faders className="size-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-[140px] right-4 w-64 rounded-3xl bg-card p-4 shadow-2xl"
            >
              <h4 className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Demo Controls
              </h4>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => { reset(); setOpen(false); }}
                  className="flex items-center gap-3 rounded-xl p-3 text-sm font-semibold text-foreground hover:bg-muted active:bg-muted/80"
                >
                  <ArrowCounterClockwise className="size-5 text-harveys" />
                  Reset to zero
                </button>
                <button
                  onClick={() => { pull(); setOpen(false); }}
                  className="flex items-center gap-3 rounded-xl p-3 text-sm font-semibold text-foreground hover:bg-muted active:bg-muted/80"
                >
                  <Scan className="size-5 text-harveys" />
                  Buy a combo (scan)
                </button>
                <button
                  onClick={() => { loadPitchState(); setOpen(false); }}
                  className="flex items-center gap-3 rounded-xl p-3 text-sm font-semibold text-foreground hover:bg-muted active:bg-muted/80"
                >
                  <FastForward className="size-4 text-harveys" />
                  Jump to pitch state
                </button>
                <button
                  onClick={() => { completeAll(); setOpen(false); }}
                  className="flex items-center gap-3 rounded-xl p-3 text-sm font-semibold text-foreground hover:bg-muted active:bg-muted/80"
                >
                  <Trophy className="size-4 text-harveys" />
                  Complete collection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
