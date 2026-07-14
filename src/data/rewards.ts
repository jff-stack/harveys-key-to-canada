/**
 * Reward roadmap — single source of truth.
 *
 * Rewards are earned at fixed cumulative qualifying-combo counts.
 * Purchases 1 and 2 earn a keychain only (no reward tier).
 * This is the exact table from the financial model.
 */

export type RewardTier = {
  atPurchase: number;
  label: string;
  emoji: string;
};

export const REWARD_TIERS: RewardTier[] = [
  { atPurchase: 3, label: "10% off your order", emoji: "🏷️" },
  { atPurchase: 5, label: "$4 off your order", emoji: "💰" },
  { atPurchase: 8, label: "Free regular fries", emoji: "🍟" },
  { atPurchase: 10, label: "15% off your order", emoji: "🎉" },
  { atPurchase: 13, label: "Free regular shake", emoji: "🥛" },
];

/**
 * Returns the next reward tier the player hasn't reached yet,
 * or null if all tiers have been earned.
 */
export function getNextReward(
  purchaseCount: number,
): RewardTier | null {
  return REWARD_TIERS.find((t) => t.atPurchase > purchaseCount) ?? null;
}

/**
 * Returns purchases remaining until the next reward,
 * or null if all rewards have been earned.
 */
export function getPurchasesUntilNextReward(
  purchaseCount: number,
): number | null {
  const next = getNextReward(purchaseCount);
  return next ? next.atPurchase - purchaseCount : null;
}

/**
 * Returns all rewards earned so far.
 */
export function getEarnedRewards(purchaseCount: number): RewardTier[] {
  return REWARD_TIERS.filter((t) => t.atPurchase <= purchaseCount);
}

/**
 * Returns the reward earned at exactly this purchase count,
 * or null if this purchase doesn't trigger a reward.
 */
export function getRewardAtPurchase(
  purchaseCount: number,
): RewardTier | null {
  return REWARD_TIERS.find((t) => t.atPurchase === purchaseCount) ?? null;
}

/**
 * Grand prize — collecting and scanning all 8 landmarks
 * enters the customer into the grand-prize draw.
 */
export const GRAND_PRIZE = {
  title: "The Great Canadian Adventure",
  destination: "Calgary & Lake Louise, Alberta",
  blurb:
    "Collect and scan all 8 landmarks to enter the grand-prize draw — an all-expenses-paid trip for two, five days, to Calgary and Lake Louise. Flights, accommodation, and a Rockies road trip included.",
  drawNotice:
    "This is a draw. Completing your collection enters you for a chance to win. Winner drawn at campaign end.",
};
