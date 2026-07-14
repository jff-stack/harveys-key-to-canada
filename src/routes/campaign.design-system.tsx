import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/campaign/design-system")({
  head: () => ({ meta: [{ title: "Key to Canada — Design System" }] }),
  component: DesignSystem,
});

const COLORS = [
  { name: "Harvey's Orange", var: "var(--grad-harveys)", note: "Primary brand & CTAs" },
  { name: "Canadian Red", var: "var(--grad-canada)", note: "Accent & hero surfaces" },
  { name: "Gold Accent", var: "var(--grad-gold)", note: "Award highlights" },
  { name: "Aurora", var: "var(--grad-aurora)", note: "Map & Grand Prize" },
];

function DesignSystem() {
  return (
    <div className="min-h-[100dvh] bg-muted">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <Link to="/campaign/profile" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground">
          <ChevronLeft className="size-4" /> Back to profile
        </Link>

        <h1 className="font-display text-4xl font-extrabold text-foreground">Key to Canada — Design System</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A premium, gamified seasonal campaign layered into Harvey's existing app. It preserves Harvey's dark UI, orange
          brand, and bottom-nav pattern while adding an Apple-Wallet-grade collectible experience.
        </p>

        <Section title="UX Rationale">
          <ul className="list-disc space-y-2 pl-5 text-sm text-foreground">
            <li><b>Fixed reward roadmap:</b> every combo → keychain → scan → progress toward known milestones. Predictable rewards build trust and drive repeat purchases.</li>
            <li><b>Completion mechanics:</b> a fixed set of 8 equal-probability landmarks makes "so close" feelings honest (not gambling). No rarity tiers.</li>
            <li><b>Always-on progress:</b> home ring, map fill, and passport stamps constantly signal "I'm nearly there."</li>
            <li><b>Canadian identity:</b> landmarks, maple particles, passport, and road-trip stories celebrate the brand's heritage.</li>
            <li><b>Social pull:</b> shareable postcards and collection screenshots turn collecting into a group activity.</li>
          </ul>
        </Section>

        <Section title="User Flow">
          <pre className="overflow-x-auto rounded-2xl bg-card p-4 text-xs text-foreground shadow-[var(--shadow-card)]">{`Harvey's Home ─▶ Key to Canada banner
      │
      ▼
Campaign Landing (Collect · Scan · Earn · Complete)
      │
      ▼
Home Dashboard ──▶ Scan ──▶ Celebration ──▶ Reward Reveal ──▶ Redeem / Save
      │                                              │
      ├──▶ Collection (flip cards + postcards)       ▼
      ├──▶ Interactive Canada Map (pins light up)   Collection updated
      ├──▶ Grand Prize (roadmap + countdown)
      └──▶ Profile ──▶ Passport / Badges / Share`}</pre>
        </Section>

        <Section title="Colour Palette">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {COLORS.map((c) => (
              <div key={c.name} className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
                <div className="h-20" style={{ background: c.var }} />
                <div className="p-3">
                  <p className="text-sm font-bold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <div className="space-y-2 rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="font-display text-3xl font-extrabold text-foreground">Sora — Display / Headings</p>
            <p className="text-base text-foreground">Manrope — Body copy, labels, and UI text for clarity at small sizes.</p>
          </div>
        </Section>

        <Section title="Component Library">
          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {["Progress Ring","Collectible Card","Reward Card","Map Pin","Passport Stamp","Stat Tile","Glass Tab Bar","Bottom Sheet","Roadmap Timeline","Achievement Badge","Digital Postcard","Dev Drawer"].map((c) => (
              <div key={c} className="rounded-xl bg-card p-3 font-medium text-foreground shadow-[var(--shadow-card)]">{c}</div>
            ))}
          </div>
        </Section>

        <Section title="Animation Notes">
          <ul className="list-disc space-y-2 pl-5 text-sm text-foreground">
            <li><b>Reward reveal:</b> 3D rotateY flip + spring-scaled emoji, opens with confetti for earned rewards.</li>
            <li><b>Scan:</b> looping laser sweep → maple pop → route to reward after 1.8s.</li>
            <li><b>Map:</b> pins use <code>pin-pop</code>, landmass fills bottom-up with completion percentage.</li>
            <li><b>Passport:</b> stamps land with a spring press and slight rotation.</li>
            <li><b>Postcard:</b> CSS 3D perspective flip between front (travel poster) and back (handwritten message).</li>
            <li><b>Ambient:</b> floating maple particles, animated progress bars.</li>
          </ul>
        </Section>

        <Section title="Accessibility">
          <ul className="list-disc space-y-2 pl-5 text-sm text-foreground">
            <li>Dark & light modes with token-driven contrast (toggle in every header).</li>
            <li>Large tap targets, semantic headings, and aria-labels on icon-only controls.</li>
            <li>Motion is decorative — all state changes are reflected in text/values too.</li>
          </ul>
        </Section>

        <Section title="Push Notification Concepts">
          <div className="space-y-2">
            {["You only need ONE more landmark to enter the Grand Prize draw 🍁","Your next reward is just 1 combo away!","You've unlocked Ontario! Tap to see the map light up","🍟 Free fries unlocked — redeem in-store or via mobile order","Complete your collection and enter the Grand Prize draw"].map((n) => (
              <div key={n} className="rounded-2xl bg-card p-3 text-sm text-foreground shadow-[var(--shadow-card)]">
                <span className="font-bold text-harveys">Harvey's · </span>{n}
              </div>
            ))}
          </div>
        </Section>

        <Link to="/campaign/home" className="mt-8 inline-flex rounded-2xl px-6 py-3 text-sm font-bold text-white" style={{ background: "var(--grad-harveys)" }}>
          Back to the experience
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-display text-xl font-bold text-foreground">{title}</h2>
      {children}
    </section>
  );
}
