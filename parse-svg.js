import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('..', 'keys', 'canada-map.svg');
const svg = fs.readFileSync(svgPath, 'utf8');

// Parse provinces
const provinces = [];
const provinceRegex = /<path id="prov-([^"]+)" data-province="([^"]+)" data-name="([^"]+)" fill="[^"]+" d="([^"]+)"\/>/g;
let match;
while ((match = provinceRegex.exec(svg)) !== null) {
  provinces.push({
    id: match[1],
    code: match[2],
    name: match[3],
    d: match[4]
  });
}

const provincesContent = `export type ProvinceId = ${provinces.map(p => `"${p.id}"`).join(' | ')};

export type ProvinceData = {
  id: ProvinceId;
  code: string;
  name: string;
  d: string;
};

export const PROVINCES: ProvinceData[] = [
${provinces.map(p => `  { id: "${p.id}", code: "${p.code}", name: "${p.name}", d: "${p.d}" }`).join(',\n')}
];
`;

fs.writeFileSync('src/data/provinces.ts', provincesContent);

// Parse pins
const pins = [];
const pinRegex = /<g data-landmark="([^"]+)" transform="translate\(([\d.]+),([\d.]+)\)">/g;
while ((match = pinRegex.exec(svg)) !== null) {
  pins.push({
    id: match[1],
    x: parseFloat(match[2]),
    y: parseFloat(match[3])
  });
}

const pinsContent = `import type { LandmarkId } from "./landmarks";

export const LANDMARK_PINS: Record<LandmarkId, { x: number; y: number }> = {
${pins.map(p => `  "${p.id}": { x: ${p.x}, y: ${p.y} }`).join(',\n')}
};
`;

fs.writeFileSync('src/data/landmarkPins.ts', pinsContent);
console.log('Successfully generated provinces.ts and landmarkPins.ts');
