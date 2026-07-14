# Key to Canada — Harvey's Seasonal Campaign Feature

An interactive, high-fidelity prototype that lives *inside* the existing Harvey's app. Preserves Harvey's dark UI, orange accent (`#F5820D`), bold sans headings, the Pick-Up location bar, shopping-bag icon, and the 5-tab bottom nav. A new **"Key to Canada"** entry is added so every new screen feels native to the current app.

## Look & feel
- Extend the existing dark theme; add a light "Apple Wallet" mode with a toggle. Dark is default.
- Tokens: Harvey's orange primary, Canadian red (`#D80621`) as accent, gold for the legendary Beaver, generous white space, rounded cards, layered soft shadows, subtle gradients, glassmorphism panels.
- Motion via Framer Motion: progress rings, card flips, confetti, coin bursts, reward-wheel spin, map pins lighting up, gold shimmer, floating maple-leaf particles, page transitions.
- All data is mock/local (in-memory + localStorage) — no backend, no login. A demo "reset" is included.

## Screens (each its own route under a shared campaign layout with the Harvey's chrome)
1. **Campaign Landing / Onboarding** — storytelling intro: Collect → Scan → Win Instantly → Complete Canada → Grand Prize. Illustrated steps, CTA into the experience.
2. **Home Dashboard** — hero card, animated progress ring ("5 of 8 landmarks"), current streak, next reward, remaining landmarks, Quick Scan + View Collection buttons, daily motivation.
3. **Collection Gallery** — large collectible cards per landmark: illustration, Canadian fact, Harvey's connection, unlock status, date collected. Locked = blurred silhouettes; Golden Beaver = glowing gold treatment. Flip animation on tap.
4. **Interactive Canada Map** (flagship) — custom stylized SVG map of Canada. Unlocked landmarks show animated pins; provinces light up with colour as you collect. Tap a pin → expanding card with photography, short story, facts, nearby Harvey's history, road-trip suggestion, trivia.
5. **Scan Screen** — simulated animated scanner. After "detecting": celebration → keychain flies into collection → province lights up → reward wheel spins → prize → confetti → Claim Reward.
6. **Reward Reveal** — Pokémon-card-style reveal of the random prize (Free Poutine, Free Shake, +500 Scene points, coupon, cash, wallpaper, trivia badge). CTAs: Redeem Now / Save for Later.
7. **Grand Prize Progress** — roadmap of 8 landmarks lighting up, completion meter, Grand Prize (Lake Louise + Banff) details, campaign countdown, optional friend leaderboard.
8. **Canadian Passport** — embossed passport spread; each landmark adds a stamp with a stamp-press animation. Premium paper/foil styling.
9. **Profile** — completion %, rewards earned, lifetime collectibles, Canadian Explorer level/XP, most-visited Harvey's, favourite rewards, badge grid.

Plus **empty states** (nothing collected, no scans, campaign complete) and a **share sheet** mock (share collection/reward/landmark, referral bonus).

## Gamification & content
- 8 landmarks (CN Tower, Niagara Falls, Parliament, Halifax Lighthouse, Lake Louise, Whistler, Northern Lights, Montreal Botanical Garden) + legendary Golden Beaver.
- XP, Explorer Rank/Level, daily streak, collection %, achievement badges, mystery silhouettes for locked items.
- Push-notification concept cards shown in an "Alerts" preview ("You only need ONE more landmark", "The Golden Beaver is still out there…").

## State model (mock)
A single campaign store (React context + localStorage): landmarks with `unlocked/date`, streak, XP/level, rewards history, theme. Scan action picks a random un-collected landmark + random reward and drives the celebration flow. Everything resets via a demo control so the flow can be re-demoed.

## Illustrations & imagery
Generate premium landmark illustrations/photography-style assets and the Golden Beaver via image generation, stored in `src/assets`. Custom hand-built SVG for the Canada map (not a real map library).

## Design system doc
A `/campaign/design-system` route documenting palette, typography, spacing, component library (cards, rings, pills, reward wheel, passport stamp), animation notes, user flow, and UX rationale — so the deliverable doubles as a spec.

---
## Technical notes
- Routes under `src/routes/campaign.*.tsx` (e.g. `campaign.index.tsx` = landing, `campaign.home.tsx`, `campaign.collection.tsx`, `campaign.map.tsx`, `campaign.scan.tsx`, `campaign.reward.tsx`, `campaign.grand-prize.tsx`, `campaign.passport.tsx`, `campaign.profile.tsx`, `campaign.design-system.tsx`) with a `campaign.tsx` layout rendering the Harvey's header + a campaign sub-nav/bottom tabs and `<Outlet />`.
- Add `framer-motion` and `canvas-confetti`. Design tokens (Canadian red, gold, gradients, shadows) added to `src/styles.css` `@theme`/`:root`/`.dark`; no hardcoded colors in components.
- Campaign store in `src/lib/campaign-store.tsx` (context + localStorage), mock data in `src/data/`.
- A phone-frame wrapper so the app reads as a mobile experience on desktop, matching the screenshots' proportions.
- Update `__root.tsx` head metadata to real Harvey's "Key to Canada" title/description.
- The home `index.tsx` becomes an entry that routes into the campaign (with the Harvey's Menu-style shell), preserving existing nav labels (Menu / Coupons / Favourites / Orders / More) with "Key to Canada" surfaced as a featured card.

## Build order
1. Tokens + deps + campaign store + mock data + phone shell/layout.
2. Landing, Home, Collection.
3. Canada Map (SVG) + Scan + Reward flow.
4. Passport, Grand Prize, Profile, empty/share states.
5. Generate illustrations; wire assets. Dark/light polish + micro-interactions.
6. Design-system doc route. Verify flows in preview.