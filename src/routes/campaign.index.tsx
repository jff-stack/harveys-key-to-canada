import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ScanLine, Gift, MapPin, Trophy, ChevronRight } from "lucide-react";
import cntower from "@/assets/landmark-cntower.png";
import niagara from "@/assets/landmark-niagara.png";

export const Route = createFileRoute("/campaign/")({
  head: () => ({
    meta: [
      { title: "Key to Canada — How it works" },
      {
        name: "description",
        content: "Collect, scan, and earn rewards across Canada with Harvey's Key to Canada.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  { icon: Gift, title: "Collect", body: "Every qualifying combo comes with a collectible Canadian landmark keychain." },
  { icon: ScanLine, title: "Scan", body: "Tap your keychain to the app to add the landmark to your collection." },
  { icon: Trophy, title: "Earn Rewards", body: "Hit combo milestones to unlock rewards — from discounts to free food." },
  { icon: MapPin, title: "Complete Canada", body: "Collect all 8 landmarks to enter the Grand Prize draw." },
];

function Landing() {
  return (
    <div className="relative flex h-full w-full flex-col bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden px-6 pb-10 pt-14 text-white" style={{ background: "var(--grad-canada)" }}>
        <div className="absolute -left-10 top-10 size-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-8 bottom-0 size-44 rounded-full bg-black/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
            🍁 Harvey's presents
          </span>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-[0.95]">
            Key to<br />Canada
          </h1>
          <p className="mt-3 max-w-[80%] text-sm text-white/85">
            Collect the True North, one landmark at a time. Every combo brings you closer to the Great Canadian Adventure.
          </p>
        </motion.div>
        <div className="relative mt-4 flex justify-center">
          <motion.img
            src={cntower}
            alt="CN Tower collectible"
            width={640}
            height={640}
            className="w-44 drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <img src={niagara} alt="" width={640} height={640} className="absolute -right-2 bottom-0 w-24 opacity-90" loading="lazy" />
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 space-y-3 p-5">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]"
          >
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-xl text-white"
              style={{ background: "var(--grad-harveys)" }}
            >
              <s.icon className="size-5" />
            </span>
            <div>
              <p className="font-display text-base font-bold text-foreground">{s.title}</p>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="sticky bottom-0 space-y-3 border-t border-border/60 bg-background/90 p-5 backdrop-blur-xl">
        <Link
          to="/campaign/home"
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white shadow-[var(--shadow-float)] transition-transform active:scale-[0.98]"
          style={{ background: "var(--grad-harveys)" }}
        >
          Start Collecting <ChevronRight className="size-5" />
        </Link>
        <Link to="/" className="block text-center text-sm font-semibold text-muted-foreground">
          Back to Harvey's app
        </Link>
      </div>
    </div>
  );
}
