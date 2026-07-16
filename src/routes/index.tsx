import { createFileRoute, Link } from "@tanstack/react-router";
import { Bag, CaretRight, ForkKnife, Tag, Star, Receipt, DotsThree } from "@phosphor-icons/react";
import cntower from "@/assets/landmark-cntower.png";
import niagara from "@/assets/landmark-niagara.png";
import DeviceFrame from "@/components/DeviceFrame";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <DeviceFrame>
      <div className="flex h-full w-full flex-col bg-background">
        {/* Harvey's header */}
        <header className="flex items-center justify-between border-b border-border/60 px-4 pb-3 pt-5">
          <span className="w-9" />
          <span
            className="text-xl font-black tracking-tight text-harveys"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            HARVEY'S
          </span>
          <Bag className="size-6 text-harveys" />
        </header>

        {/* Pick-up bar */}
        <div className="flex items-center justify-between bg-muted/60 px-4 py-3 text-center">
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">Pick-Up</p>
            <p className="text-xs text-muted-foreground">9 min · 170 University Ave W, Waterloo</p>
          </div>
          <button className="text-sm font-semibold text-harveys">Edit</button>
        </div>

        <main className="flex-1 space-y-6 overflow-y-auto p-4 pb-24">
          {/* Key to Canada featured hero */}
          <Link to="/campaign/home" className="block">
            <div
              className="relative overflow-hidden rounded-3xl p-5 text-white shadow-[var(--shadow-float)]"
              style={{ background: "var(--grad-canada)" }}
            >
              <div className="absolute -right-6 -top-6 size-40 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-center justify-between">
                <div className="max-w-[62%]">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                    🍁 New Campaign
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight">
                    Key to Canada
                  </h2>
                  <p className="mt-1 text-sm text-white/85">
                    Collect landmarks. Earn rewards. Complete Canada.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-bold text-canada">
                    Start Collecting <CaretRight className="size-4" />
                  </span>
                </div>
                <img
                  src={cntower}
                  alt="CN Tower collectible"
                  width={640}
                  height={640}
                  className="animate-float w-28 drop-shadow-2xl"
                />
              </div>
            </div>
          </Link>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-foreground">Menu</h3>
              <span className="flex items-center gap-1 text-sm font-semibold text-harveys">
                See full menu <CaretRight className="ml-1 size-4 opacity-50" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { t: "$3 Summer Menu", img: cntower },
                { t: "Burgers", img: niagara },
              ].map((c) => (
                <div key={c.t} className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
                  <div className="flex h-28 items-center justify-center bg-muted">
                    <img src={c.img} alt={c.t} width={640} height={640} loading="lazy" className="h-24 w-auto" />
                  </div>
                  <p className="p-3 text-sm font-semibold text-foreground">{c.t}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Existing Harvey's bottom nav */}
        <nav className="sticky bottom-0 flex items-stretch justify-between border-t border-border/60 bg-background px-2 py-2">
          {[
            { l: "Menu", I: ForkKnife },
            { l: "Coupons", I: Tag },
            { l: "Favourites", I: Star },
            { l: "Orders", I: Receipt },
            { l: "More", I: DotsThree },
          ].map(({ l, I }) => (
            <div key={l} className="flex flex-1 flex-col items-center gap-1 py-1">
              <I className="size-7 text-muted-foreground" />
              <span className="text-[10px] font-semibold text-muted-foreground">{l}</span>
            </div>
          ))}
        </nav>
      </div>
    </DeviceFrame>
  );
}
