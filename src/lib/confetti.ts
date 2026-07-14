import confetti from "canvas-confetti";

export function fireConfetti() {
  const defaults = { spread: 70, ticks: 200, gravity: 0.9, decay: 0.92, startVelocity: 32 };
  const colors = ["#F5820D", "#D80621", "#ffffff", "#FFD166"];
  confetti({ ...defaults, particleCount: 60, origin: { x: 0.5, y: 0.5 }, colors });
  setTimeout(
    () => confetti({ ...defaults, particleCount: 40, angle: 60, origin: { x: 0, y: 0.6 }, colors }),
    150,
  );
  setTimeout(
    () => confetti({ ...defaults, particleCount: 40, angle: 120, origin: { x: 1, y: 0.6 }, colors }),
    250,
  );
}
