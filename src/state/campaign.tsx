import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LANDMARKS, type LandmarkId } from "@/data/landmarks";
import {
  REWARD_TIERS,
  getNextReward,
  getPurchasesUntilNextReward,
  getEarnedRewards,
  getRewardAtPurchase,
  type RewardTier,
} from "@/data/rewards";

/* ------------------------------------------------------------------ */
/*  State                                                             */
/* ------------------------------------------------------------------ */

export type CampaignState = {
  purchaseCount: number; // cumulative qualifying combos
  collected: LandmarkId[]; // chronologically scanned landmarks
  counts: Record<LandmarkId, number>; // counts of each landmark
  claimedRewards: number[]; // purchase thresholds of claimed rewards
  theme: "dark" | "light";
};

const STORAGE_KEY = "harveys-key-to-canada-v3";

const DEMO_COLLECTED: LandmarkId[] = [
  "cn-tower",
  "parliament",
  "niagara",
  "montreal",
  "halifax",
  "lake-louise",
];

const DEFAULT_STATE: CampaignState = {
  purchaseCount: 0,
  collected: [],
  counts: {} as Record<LandmarkId, number>,
  claimedRewards: [],
  theme: "dark",
};

/* ------------------------------------------------------------------ */
/*  Last-scan result                                                  */
/* ------------------------------------------------------------------ */

export type ScanResult = {
  landmarkId: LandmarkId;
  isNew: boolean;
  copyNumber: number;
  purchaseCount: number;
  unlockedReward: RewardTier | null;
};

/* ------------------------------------------------------------------ */
/*  Context shape                                                     */
/* ------------------------------------------------------------------ */

type Ctx = {
  state: CampaignState;
  landmarks: typeof LANDMARKS;
  rewardTiers: typeof REWARD_TIERS;

  // derived
  collectedSet: Set<LandmarkId>;
  collectedCount: number;
  completionPct: number; // 0–100
  drawEligible: boolean;
  nextReward: RewardTier | null;
  purchasesUntilNextReward: number | null;
  earnedRewards: RewardTier[];
  missingLandmarks: typeof LANDMARKS;

  // helpers
  isCollected: (id: LandmarkId) => boolean;
  getCopyCount: (id: LandmarkId) => number;
  isClaimed: (reward: RewardTier) => boolean;

  // actions
  lastScan: ScanResult | null;
  pull: () => ScanResult;
  claim: (reward: RewardTier) => void;
  toggleTheme: () => void;
  reset: () => void;
  loadPitchState: () => void;
  completeAll: () => void;
};

const CampaignContext = createContext<Ctx | null>(null);

/* ------------------------------------------------------------------ */
/*  Persistence                                                       */
/* ------------------------------------------------------------------ */

function load(): CampaignState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      collected: Array.isArray(parsed.collected)
        ? parsed.collected
        : DEFAULT_STATE.collected,
      counts: typeof parsed.counts === "object" ? parsed.counts : {},
      claimedRewards: Array.isArray(parsed.claimedRewards) ? parsed.claimedRewards : [],
    };
  } catch {
    return DEFAULT_STATE;
  }
}

/* ------------------------------------------------------------------ */
/*  Provider                                                          */
/* ------------------------------------------------------------------ */

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CampaignState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [lastScan, setLastScan] = useState<ScanResult | null>(null);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [state.theme]);

  const value = useMemo<Ctx>(() => {
    const collectedSet = new Set(state.collected);
    const collectedCount = collectedSet.size;
    const completionPct = Math.round((collectedCount / 8) * 100);
    const drawEligible = collectedCount === 8;
    const nextReward = getNextReward(state.purchaseCount);
    const purchasesUntilNextReward = getPurchasesUntilNextReward(
      state.purchaseCount,
    );
    const earnedRewards = getEarnedRewards(state.purchaseCount);
    const missingLandmarks = LANDMARKS.filter((l) => !collectedSet.has(l.id));

    const isCollected = (id: LandmarkId) => collectedSet.has(id);
    const getCopyCount = (id: LandmarkId) => state.counts[id] || 0;
    const isClaimed = (reward: RewardTier) => state.claimedRewards.includes(reward.purchase);

    const pull = (): ScanResult => {
      // Flat, equal 1/8 chance across all 8 landmarks
      const landmark = LANDMARKS[Math.floor(Math.random() * LANDMARKS.length)];
      
      const newPurchaseCount = state.purchaseCount + 1;
      const unlockedReward = getRewardAtPurchase(newPurchaseCount);
      const copyNumber = (state.counts[landmark.id] || 0) + 1;
      const isNew = copyNumber === 1;

      const result: ScanResult = { 
        landmarkId: landmark.id, 
        isNew,
        copyNumber,
        purchaseCount: newPurchaseCount,
        unlockedReward 
      };
      
      setLastScan(result);

      setState((s) => ({
        ...s,
        purchaseCount: newPurchaseCount,
        collected: isNew ? [...s.collected, landmark.id] : s.collected,
        counts: {
          ...s.counts,
          [landmark.id]: copyNumber,
        }
      }));

      return result;
    };

    const claim = (reward: RewardTier) => {
      setState(s => ({
        ...s,
        claimedRewards: [...new Set([...s.claimedRewards, reward.purchase])]
      }));
    };

    const reset = () => {
      setState({ ...DEFAULT_STATE, theme: state.theme });
      setLastScan(null);
    };

    const loadPitchState = () => {
      const counts: Record<string, number> = {};
      DEMO_COLLECTED.forEach(id => counts[id] = 1);
      // Give one duplicate to reach 9 purchases (6 distinct + 3 duplicates = 9)
      counts["cn-tower"] = 4;

      setState(s => ({
        ...s,
        purchaseCount: 9,
        collected: [...DEMO_COLLECTED],
        counts,
        claimedRewards: [3, 5, 8], // claimed rewards 3/5/8
      }));
      setLastScan(null);
    };

    const completeAll = () => {
      const allIds = LANDMARKS.map(l => l.id);
      const counts: Record<string, number> = {};
      allIds.forEach(id => counts[id] = 1);

      setState(s => ({
        ...s,
        purchaseCount: Math.max(s.purchaseCount, 13), // Ensure they get all rewards
        collected: allIds,
        counts,
        claimedRewards: s.claimedRewards
      }));
    };

    return {
      state,
      landmarks: LANDMARKS,
      rewardTiers: REWARD_TIERS,
      collectedSet,
      collectedCount,
      completionPct,
      drawEligible,
      nextReward,
      purchasesUntilNextReward,
      earnedRewards,
      missingLandmarks,
      isCollected,
      getCopyCount,
      isClaimed,
      lastScan,
      pull,
      claim,
      toggleTheme: () =>
        setState((s) => ({
          ...s,
          theme: s.theme === "dark" ? "light" : "dark",
        })),
      reset,
      loadPitchState,
      completeAll,
    };
  }, [state, lastScan]);

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const ctx = useContext(CampaignContext);
  if (!ctx)
    throw new Error("useCampaign must be used within CampaignProvider");
  return ctx;
}
