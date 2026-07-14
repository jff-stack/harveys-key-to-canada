import { PROVINCES } from "@/data/provinces";
import { LANDMARK_PINS } from "@/data/landmarkPins";
import { LANDMARKS } from "@/data/landmarks";
import type { LandmarkId, Landmark } from "@/data/landmarks";

export function CanadaMap({
  collected,
  onPinClick,
}: {
  collected: LandmarkId[];
  onPinClick?: (landmark: Landmark) => void;
}) {
  return (
    <svg viewBox="0 0 800 800" className="h-full w-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="unlocked" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8442E" />
          <stop offset="100%" stopColor="#C4321F" />
        </linearGradient>
        <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>
      
      <g id="provinces" stroke="#FFFFFF" strokeWidth="1.1" strokeLinejoin="round">
        {PROVINCES.map((prov) => {
          // Check if any collected landmark is in this province
          const isProvUnlocked = collected.some((id) => {
            const landmark = LANDMARKS.find(l => l.id === id);
            return landmark?.provinceCode === prov.code;
          });
          
          return (
            <path
              key={prov.id}
              d={prov.d}
              fill={isProvUnlocked ? "url(#unlocked)" : "#E4E7EB"}
              className="transition-colors duration-700 ease-in-out"
            />
          );
        })}
      </g>
      
      <g id="pins" filter="url(#pinShadow)">
        {LANDMARKS.map((landmark) => {
          const pin = LANDMARK_PINS[landmark.id];
          if (!pin) return null;
          
          const isCollected = collected.includes(landmark.id);
          
          return (
            <g
              key={landmark.id}
              transform={`translate(${pin.x}, ${pin.y})`}
              onClick={() => {
                if (isCollected) onPinClick?.(landmark);
              }}
              style={{ cursor: isCollected ? "pointer" : "default" }}
              className={isCollected ? "opacity-100" : "opacity-40"}
            >
              <path d="M0,0 C-7,-9 -11,-13 -11,-19 a11,11 0 1 1 22,0 C11,-13 7,-9 0,0 Z" fill={isCollected ? "url(#unlocked)" : "#9CA3AF"} />
              <circle cx="0" cy="-19" r="4.4" fill="#FFF" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
