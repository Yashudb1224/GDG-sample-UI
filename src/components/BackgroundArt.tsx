"use client";

import { useEffect, useRef } from "react";

/**
 * Page backdrop: big Google-colour shapes pinned to the viewport edges, peeking out
 * from behind the tiles. Each shape is a thick "chip": a solid extruded side in a
 * darker shade (lit from the top-left, matching the cards' hard shadows) plus a faint
 * sheen on the face. Layers drift with the pointer (mouse devices) and each shape has
 * its own bounded scroll move (float, sway or spin). Reduced-motion users get the
 * still version. The graph paper lives on <body>.
 */

const EXTRUDE = 9; // depth of the side, in viewBox units
const STROKE = "var(--line)";

const SHADE = {
  blue: ["var(--g-blue)", "#1a56c4"],
  red: ["var(--g-red)", "#b3261e"],
  yellow: ["var(--g-yellow)", "#c98f00"],
  green: ["var(--g-green)", "#1e7e3a"],
} as const;

/** Draws a shape as a 3D chip: stacked side layers, an outlined back edge, then the lit face. */
function Chip({ d, color, children }: { d: string; color: keyof typeof SHADE; children?: React.ReactNode }) {
  const [face, side] = SHADE[color];
  return (
    <>
      {/* Back edge outline, then the solid side built from 1-unit steps */}
      <path d={d} transform={`translate(${EXTRUDE} ${EXTRUDE})`} fill={side} stroke={STROKE} strokeWidth="3" strokeLinejoin="round" />
      {Array.from({ length: EXTRUDE - 1 }, (_, i) => (
        <path key={i} d={d} transform={`translate(${EXTRUDE - 1 - i} ${EXTRUDE - 1 - i})`} fill={side} />
      ))}
      {/* Face + sheen */}
      <path d={d} fill={face} stroke={STROKE} strokeWidth="3" strokeLinejoin="round" />
      <path d={d} fill="url(#bg-sheen)" />
      {children}
    </>
  );
}

// Shape outlines in a 0..200 box (the viewBox leaves room for the extrusion)
const CIRCLE = "M100 4 A96 96 0 1 1 99.99 4 Z";
// A "< >" code bracket pair drawn as two rounded strokes, single colour
const BRACKETS = "M80 38 L26 100 L80 162 M120 38 L174 100 L120 162";

/** Like Chip, but for stroked line art: ink outline, extruded side, coloured face. */
function StrokeChip({ d, color, width = 26 }: { d: string; color: keyof typeof SHADE; width?: number }) {
  const [face, side] = SHADE[color];
  const line = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <>
      <path d={d} {...line} transform={`translate(${EXTRUDE} ${EXTRUDE})`} stroke={STROKE} strokeWidth={width + 6} />
      {Array.from({ length: EXTRUDE }, (_, i) => (
        <path key={i} d={d} {...line} transform={`translate(${EXTRUDE - i} ${EXTRUDE - i})`} stroke={side} strokeWidth={width} />
      ))}
      <path d={d} {...line} stroke={STROKE} strokeWidth={width + 6} />
      <path d={d} {...line} stroke={face} strokeWidth={width} />
    </>
  );
}
const TRIANGLE = "M100 8 L192 184 L8 184 Z";
const PLUS = "M70 8 H130 V70 H192 V130 H130 V192 H70 V130 H8 V70 H70 Z";
const SMALL_SQUARE = "M26 14 H74 A12 12 0 0 1 86 26 V74 A12 12 0 0 1 74 86 H26 A12 12 0 0 1 14 74 V26 A12 12 0 0 1 26 14 Z";

export function BackgroundArt() {
  const root = useRef<HTMLDivElement>(null);

  // Motion, all bounded so nothing drifts off-screen on long pages:
  //  - pointer parallax (mouse devices): layers ease toward an offset scaled by depth
  //  - scroll (every device): each shape has its own move, set by data attributes
  //      data-bob   vertical float (px amplitude), phase-shifted per layer
  //      data-sway  rotation back and forth (deg amplitude)
  //      data-spin  continuous rotation (deg per 100px scrolled), for symmetric parts
  // Everything is skipped under prefers-reduced-motion.
  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pointerOK = matchMedia("(hover: hover) and (pointer: fine)").matches;

    const layers = [...el.querySelectorAll<HTMLElement>("[data-depth]")].map((node, i) => ({
      node,
      depth: Number(node.dataset.depth),
      bob: Number(node.dataset.bob ?? 0),
      phase: i * 1.7,
    }));
    const sways = [...el.querySelectorAll<SVGElement>("[data-sway]")].map((node, i) => ({
      node,
      amp: Number(node.dataset.sway),
      base: node.dataset.base ?? "",
      phase: i * 2.3,
    }));
    const spins = [...el.querySelectorAll<SVGElement>("[data-spin]")].map((node) => ({ node, rate: Number(node.dataset.spin) }));

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let scroll = scrollY;
    let raf = 0;

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      scroll += (scrollY - scroll) * 0.12; // eased, so fast flicks still glide

      for (const { node, depth, bob, phase } of layers) {
        const float = Math.sin(scroll / 420 + phase) * bob;
        node.style.transform = `translate3d(${(cur.x * depth * 10).toFixed(2)}px, ${(cur.y * depth * 10 + float).toFixed(2)}px, 0)`;
      }
      for (const { node, amp, base, phase } of sways) {
        node.style.transform = `${base} rotate(${(Math.sin(scroll / 520 + phase) * amp).toFixed(2)}deg)`;
      }
      for (const { node, rate } of spins) {
        node.style.transform = `rotate(${((scroll / 100) * rate).toFixed(2)}deg)`;
      }

      const settled = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) < 0.001 && Math.abs(scrollY - scroll) < 0.5;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / innerWidth - 0.5) * 2;
      target.y = (e.clientY / innerHeight - 0.5) * 2;
      kick();
    };

    if (pointerOK) addEventListener("pointermove", onMove, { passive: true });
    addEventListener("scroll", kick, { passive: true });
    tick(); // apply the current scroll position on load
    return () => {
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", kick);
      cancelAnimationFrame(raf);
    };
  }, []);

  const vb = `0 0 ${200 + EXTRUDE + 4} ${200 + EXTRUDE + 4}`;

  return (
    <div ref={root} aria-hidden="true" className="bg-art pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="bg-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.38" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Top-left: yellow disc */}
      <div data-depth="1" data-bob="10" className="absolute -left-24 -top-24 h-72 w-72 will-change-transform sm:h-96 sm:w-96">
        <svg className="h-full w-full" viewBox={vb}>
          <Chip d={CIRCLE} color="yellow">
            {/* Dashed ring turns as you scroll */}
            <circle data-spin="9" className="origin-center [transform-box:fill-box]" cx="100" cy="100" r="60" fill="none" stroke={STROKE} strokeWidth="3" strokeDasharray="6 8" />
          </Chip>
        </svg>
      </div>

      {/* Right edge: blue < > code brackets */}
      <div data-depth="1.6" data-bob="14" className="absolute right-1 top-[44%] hidden h-36 w-36 will-change-transform md:block xl:right-3 xl:h-44 xl:w-44 2xl:h-56 2xl:w-56">
        <svg data-sway="6" className="h-full w-full -rotate-3 overflow-visible" viewBox={vb}>
          <StrokeChip d={BRACKETS} color="blue" />
        </svg>
      </div>

      {/* Bottom-left: red triangle */}
      <div data-depth="1.3" data-bob="22" className="absolute -bottom-28 -left-24 h-56 w-56 will-change-transform md:-bottom-16 md:-left-10 md:h-72 md:w-72">
        <svg data-sway="3" className="h-full w-full -rotate-6" viewBox={vb}>
          <Chip d={TRIANGLE} color="red" />
        </svg>
      </div>

      {/* Bottom-right: green plus */}
      <div data-depth="0.8" data-bob="8" className="absolute -bottom-24 -right-24 h-48 w-48 will-change-transform md:-bottom-10 md:-right-10 md:h-60 md:w-60">
        <svg data-sway="10" className="h-full w-full rotate-[18deg]" viewBox={vb}>
          <Chip d={PLUS} color="green" />
        </svg>
      </div>

      {/* Small accents in the wide-screen gutters: closest layer, drift the most */}
      <div data-depth="2.4" data-bob="18" className="absolute left-[3%] top-[55%] hidden h-24 w-24 will-change-transform xl:block">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 100 100">
          <path d="M6 54 Q 20 24 34 54 T 62 54 T 94 54" fill="none" stroke="#1a56c4" strokeWidth="8" strokeLinecap="round" />
          <path d="M6 50 Q 20 20 34 50 T 62 50 T 94 50" fill="none" stroke="var(--g-blue)" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>
      <div data-depth="2" data-bob="14" className="absolute right-[4%] top-[14%] hidden h-16 w-16 will-change-transform xl:block">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 100 100">
          <circle cx="54" cy="54" r="40" fill="none" stroke="#b3261e" strokeWidth="12" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--g-red)" strokeWidth="12" />
        </svg>
      </div>
      <div data-depth="2.8" data-bob="20" className="absolute bottom-[22%] right-[6%] hidden h-14 w-14 will-change-transform xl:block">
        <svg data-sway="18" className="h-full w-full rotate-[20deg] overflow-visible" viewBox="0 0 106 106">
          <Chip d={SMALL_SQUARE} color="yellow" />
        </svg>
      </div>
    </div>
  );
}
