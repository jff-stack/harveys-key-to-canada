import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, RotateCcw } from "lucide-react";
import type { Landmark } from "@/data/landmarks";
import { getPostcardArt } from "@/assets/postcards";

type Props = {
  landmark: Landmark;
  onClose?: () => void;
};

export function DigitalPostcard({ landmark, onClose }: Props) {
  const [flipped, setFlipped] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${landmark.name} — Key to Canada`,
      text: `I collected ${landmark.name} in Harvey's Key to Canada! 🍁`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`,
        );
      }
    } catch {
      // user cancelled share
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Flip container */}
      <div
        className="relative w-full max-w-[320px] cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          className="relative w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* FRONT — travel-poster illustration */}
          <div
            className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-[var(--shadow-float)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Stamp-shaped perforated edge */}
            <div className="absolute inset-x-2 bottom-2 top-2 overflow-hidden rounded-2xl bg-muted shadow-inner">
              <img
                src={getPostcardArt(landmark.art)}
                alt=""
                width={640}
                height={640}
                loading="lazy"
                className="h-full w-full object-contain bg-white"
              />
            </div>

            <div className="absolute right-3 top-3 z-20 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white/80">
              Tap to flip
            </div>
          </div>

          {/* BACK — handwritten postcard */}
          <div
            className="absolute inset-0 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[oklch(0.96_0.02_85)] p-6 shadow-[var(--shadow-float)] dark:bg-[oklch(0.22_0.02_85)]"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Perforated edge */}
            <div className="absolute inset-0 rounded-2xl border-[3px] border-dashed border-canada/30" />

            <div className="relative flex h-full flex-col justify-between">
              {/* "Wish you were here!" */}
              <div>
                <p
                  className="text-3xl text-canada"
                  style={{
                    fontFamily:
                      "'Caveat', 'Dancing Script', 'Segoe Script', cursive",
                  }}
                >
                  Wish you were here!
                </p>

                {/* Did you know? */}
                <div className="mt-5 rounded-xl bg-white/60 p-4 dark:bg-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-canada">
                    Did you know?
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                    {landmark.harveysFact}
                  </p>
                </div>
              </div>

              {/* Footer: Harvey's logo + postmark */}
              <div className="flex items-end justify-between">
                <div>
                  <span
                    className="text-base font-black tracking-tight text-harveys"
                    style={{
                      fontFamily: "Georgia, serif",
                      fontStyle: "italic",
                    }}
                  >
                    HARVEY'S
                  </span>
                  <p className="text-[9px] font-semibold text-muted-foreground">
                    Est. 1959 · Richmond Hill, ON
                  </p>
                </div>
                {/* Postmark stamp */}
                <div className="flex flex-col items-center rounded-full border-2 border-canada/50 px-3 py-1.5">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-canada">
                    Made in
                  </span>
                  <span className="text-[10px] font-black uppercase text-canada">
                    Canada
                  </span>
                  <span className="text-[8px] text-canada/70">🍁</span>
                </div>
              </div>
            </div>

            {/* Tap hint */}
            <div className="absolute right-3 top-3 rounded-full bg-black/10 px-2.5 py-1 text-[10px] font-semibold text-foreground/60 dark:bg-white/10">
              Tap to flip
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="flex w-full max-w-[320px] gap-3">
        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-white shadow-[var(--shadow-float)]"
          style={{ background: "var(--grad-harveys)" }}
        >
          <Share2 className="size-4" />
          Share Postcard
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-1 rounded-2xl bg-muted px-4 py-3 text-sm font-bold text-foreground"
          >
            <RotateCcw className="size-4" />
            Back
          </button>
        )}
      </div>
    </div>
  );
}
