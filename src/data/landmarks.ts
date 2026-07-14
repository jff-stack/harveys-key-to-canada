
export type LandmarkId =
  | "cn-tower"
  | "parliament"
  | "niagara"
  | "montreal"
  | "halifax"
  | "lake-louise"
  | "whistler"
  | "aurora";

export type Landmark = {
  id: LandmarkId;
  name: string;
  location: string;
  province: string;
  provinceCode: string;
  art: string;
  fact: string;
  story: string;
  harveys: string;
  roadTrip: string;
  trivia: string;
  /** Harvey's-heritage or Canadian brand fact for the digital postcard */
  harveysFact: string;
  /** position on the stylized SVG map, 0-100 percentage */
  map: { x: number; y: number };
  accent: string;
};

/**
 * Exactly 8 landmarks, all equal probability (1/8).
 * No rarity tier of any kind.
 */
export const LANDMARKS: Landmark[] = [
  {
    id: "cn-tower",
    name: "CN Tower",
    location: "Toronto, Ontario",
    province: "Ontario",
    provinceCode: "ON",
    art: "toronto",
    fact: "At 553m, it was the world's tallest free-standing structure for 32 years.",
    story:
      "Rising over Toronto's skyline, the CN Tower has been the heartbeat of Canada's biggest city since 1976 — glass floor and all.",
    harveys:
      "The very first Harvey's opened in Richmond Hill, Ontario in 1959 — CN Tower country.",
    roadTrip: "Pair with Niagara Falls — just 90 minutes down the QEW.",
    trivia: "The glass floor can hold the weight of 35 moose. 🫎",
    harveysFact:
      "Harvey's was founded in Richmond Hill, Ontario in 1959 — making it the only major Canadian-founded burger chain still operating coast to coast.",
    map: { x: 62, y: 74 },
    accent: "canada",
  },
  {
    id: "parliament",
    name: "Parliament Hill",
    location: "Ottawa, Ontario",
    province: "Ontario",
    provinceCode: "ON",
    art: "ottawa",
    fact: "The Peace Tower stands 92.2m tall and holds a 53-bell carillon.",
    story:
      "The Gothic heart of Canadian democracy in Ottawa, glowing green-roofed above the Ottawa River.",
    harveys:
      "A capital classic — order it 'your way' just like a true Canadian.",
    roadTrip:
      "Skate the Rideau Canal in winter, the world's largest skating rink.",
    trivia: "The Centennial Flame has burned since 1967.",
    harveysFact:
      "Harvey's flame-grills every burger to order — a tradition that's been the cornerstone of its menu since day one in 1959.",
    map: { x: 66, y: 71 },
    accent: "aurora-1",
  },
  {
    id: "niagara",
    name: "Niagara Falls",
    location: "Ontario",
    province: "Ontario",
    provinceCode: "ON",
    art: "niagara",
    fact: "More than 3,000 tonnes of water flow over Niagara every second.",
    story:
      "The thunder of the Horseshoe Falls draws millions each year to feel the mist on their face.",
    harveys:
      "Grab a charbroiled burger before the Maid of the Mist — a true Ontario combo.",
    roadTrip:
      "Loop back to Toronto through wine country in Niagara-on-the-Lake.",
    trivia:
      "The falls actually move — eroding backward about 30cm a year.",
    harveysFact:
      "Harvey's uses 100% Canadian beef in every burger — sourced and served proudly from coast to coast.",
    map: { x: 64, y: 78 },
    accent: "aurora-1",
  },
  {
    id: "montreal",
    name: "Montréal Botanical Garden",
    location: "Quebec",
    province: "Québec",
    provinceCode: "QC",
    art: "montreal",
    fact: "One of the largest botanical gardens in the world, with 22,000 plant species.",
    story:
      "Glass greenhouses and dreamlike gardens in the heart of Québec's cultural capital.",
    harveys:
      "Joignez-vous à nous — a burger 'à votre façon' after a garden stroll.",
    roadTrip: "Explore Old Montréal's cobblestone streets afterward.",
    trivia: "The Chinese Garden is the largest outside Asia.",
    harveysFact:
      "Harvey's operates nearly 300 restaurants across Canada — every one of them Canadian-owned and operated.",
    map: { x: 74, y: 71 },
    accent: "aurora-1",
  },
  {
    id: "halifax",
    name: "Peggy's Cove Lighthouse",
    location: "Halifax, Nova Scotia",
    province: "Nova Scotia",
    provinceCode: "NS",
    art: "halifax",
    fact: "One of the most photographed lighthouses in the world.",
    story:
      "Perched on wave-smoothed granite, this red-and-white beacon has guided Atlantic sailors since 1915.",
    harveys:
      "Maritime magic — pair with a poutine and watch the tide roll in.",
    roadTrip: "Drive the Lighthouse Route along Nova Scotia's south shore.",
    trivia: "The rocks are 415 million years old.",
    harveysFact:
      "Harvey's signature charbroiled flavour comes from cooking over an open flame — not a flat grill — giving every patty its distinctive smoky taste.",
    map: { x: 84, y: 70 },
    accent: "canada",
  },
  {
    id: "lake-louise",
    name: "Lake Louise",
    location: "Alberta",
    province: "Alberta",
    provinceCode: "AB",
    art: "lake_louise",
    fact: "The turquoise colour comes from glacial 'rock flour' in the water.",
    story:
      "A mirror of turquoise cradled by the Rockies — the crown jewel of Banff National Park.",
    harveys:
      "The Grand Prize destination itself. Collect them all to get here.",
    roadTrip:
      "Cruise the Icefields Parkway to Jasper — Canada's most scenic drive.",
    trivia: "Named after Princess Louise, daughter of Queen Victoria.",
    harveysFact:
      "Harvey's introduced its customizable toppings bar when it opened in 1959 — decades before \"personalization\" became a major food trend.",
    map: { x: 24, y: 70 },
    accent: "aurora-1",
  },
  {
    id: "whistler",
    name: "Whistler Mountain",
    location: "British Columbia",
    province: "British Columbia",
    provinceCode: "BC",
    art: "BC",
    fact: "Home to the longest lift system on the continent.",
    story:
      "Two mighty peaks, endless powder, and a village that never sleeps — the soul of the West Coast.",
    harveys: "Après-ski fuel, Canadian style. Upsize those onion rings.",
    roadTrip: "The Sea-to-Sky Highway from Vancouver is pure magic.",
    trivia: "Hosted the 2010 Winter Olympics.",
    harveysFact:
      "Harvey's lets you build your burger with over a dozen free toppings — a level of customisation no other Canadian chain matches.",
    map: { x: 15, y: 68 },
    accent: "aurora-2",
  },
  {
    id: "aurora",
    name: "Northern Lights",
    location: "Yukon Territory",
    province: "Yukon",
    provinceCode: "YT",
    art: "northern",
    fact: "The aurora is caused by solar particles hitting our atmosphere.",
    story:
      "Ribbons of green and violet dancing across the northern sky — Canada's greatest light show.",
    harveys:
      "Warm up after a night of sky-watching with a hot charbroiled classic.",
    roadTrip:
      "Chase them from Whitehorse under some of the darkest skies on Earth.",
    trivia: "Best viewed between August and April.",
    harveysFact:
      "From its single 1959 location in Richmond Hill, Harvey's has grown to serve millions of Canadians every year — a true national original.",
    map: { x: 14, y: 30 },
    accent: "aurora-2",
  },
];
