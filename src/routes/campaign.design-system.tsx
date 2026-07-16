import { createFileRoute, Link } from "@tanstack/react-router";
import { CaretLeft } from "@phosphor-icons/react";

export const Route = createFileRoute("/campaign/design-system")({
  head: () => ({ meta: [{ title: "Key to Canada — Design System" }] }),
  component: DesignSystem,
});

function DesignSystem() {
  return (
    <div className="min-h-[100dvh] bg-[#fdfbf7] text-stone-800 dark:bg-stone-950 dark:text-stone-300">
      <div className="mx-auto max-w-2xl px-6 py-8">
        <Link to="/campaign/profile" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-stone-500 hover:text-stone-800 dark:hover:text-stone-100">
          <CaretLeft className="size-4" /> Back to profile
        </Link>

        <div className="mb-8 border-b-2 border-stone-200 pb-4 dark:border-stone-800">
          <h1 className="font-mono text-2xl font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100">Design Notes</h1>
          <p className="mt-2 font-mono text-sm text-stone-500">Key to Canada Campaign</p>
        </div>

        <div className="space-y-8 font-mono text-sm leading-relaxed">
          
          <section>
            <h2 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">UX Rationale</h2>
            <ul className="list-inside list-disc space-y-1 text-stone-600 dark:text-stone-400">
              <li>Fixed reward roadmap: predictable rewards build trust.</li>
              <li>Completion mechanics: 8 equal-probability landmarks; no rarity tiers.</li>
              <li>Always-on progress: home ring, map fill, and passport stamps constantly signal progress.</li>
              <li>Canadian identity: celebrates brand heritage.</li>
              <li>Social pull: shareable postcards and collection screenshots.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">User Flow</h2>
            <div className="rounded border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900">
              <pre className="whitespace-pre-wrap text-xs text-stone-600 dark:text-stone-400">
{`Home -> Campaign Landing
-> Dashboard -> Scan -> Reward Reveal -> Redeem
-> Collection (Cards/Postcards)
-> Map (Interactive)
-> Grand Prize Roadmap
-> Profile (Passport / Badges)`}
              </pre>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">Component Library</h2>
            <ul className="grid grid-cols-2 gap-1 list-inside list-disc text-stone-600 dark:text-stone-400">
              <li>Progress Ring</li>
              <li>Collectible Card</li>
              <li>Reward Card</li>
              <li>Map Pin</li>
              <li>Passport Stamp</li>
              <li>Stat Tile</li>
              <li>Glass Tab Bar</li>
              <li>Bottom Sheet</li>
              <li>Roadmap Timeline</li>
              <li>Achievement Badge</li>
              <li>Digital Postcard</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">Animation Notes</h2>
            <ul className="list-inside list-disc space-y-1 text-stone-600 dark:text-stone-400">
              <li>Reward reveal: 3D rotateY flip, spring-scaled icon, confetti.</li>
              <li>Scan: looping sweep, routing after 1.8s.</li>
              <li>Map: pins pop, landmass fills bottom-up with completion.</li>
              <li>Passport: stamps land with spring press and rotation.</li>
              <li>Postcard: CSS 3D perspective flip (front to back).</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">Push Notifications</h2>
            <ul className="list-inside list-disc space-y-1 text-stone-600 dark:text-stone-400">
              <li>One more landmark needed to enter the Grand Prize draw.</li>
              <li>Next reward is 1 combo away.</li>
              <li>Ontario unlocked, map updated.</li>
              <li>Free fries unlocked (redeem in-store/mobile).</li>
              <li>Collection complete, entered into Grand Prize.</li>
            </ul>
          </section>

        </div>
        <div className="pt-16 pb-8 text-center font-mono text-sm text-stone-400 dark:text-stone-500 italic">
          Jason Francis
        </div>
      </div>
    </div>
  );
}
