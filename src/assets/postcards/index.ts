import type { LandmarkId } from "@/data/landmarks";

// Import all PNG files in this directory eagerly
const modules = import.meta.glob('./*.png', { eager: true, query: '?url', import: 'default' });

// We map the postcard `art` field to the actual image URL.
// The `art` field corresponds to the filename without the .png extension.
// We match case-insensitively just like with the keys.
const images: Record<string, string> = {};
for (const path in modules) {
  // Extract filename without extension (e.g. "./BC.png" -> "bc")
  const match = path.match(/\.\/(.+)\.png$/i);
  if (match) {
    const key = match[1].toLowerCase();
    images[key] = modules[path] as string;
  }
}

// We map this back by looking at the expected `art` field
export const getPostcardArt = (art: string): string => {
  return images[art.toLowerCase()] || "";
};
