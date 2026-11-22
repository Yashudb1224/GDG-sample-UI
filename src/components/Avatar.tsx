import type { GColor } from "@/lib/site";

const FILL: Record<GColor, string> = {
  gblue: "#4285f4",
  gred: "#ea4335",
  gyellow: "#fbbc04",
  ggreen: "#34a853",
};
// A second Google colour for the accent shape, never the same as the ground
const ACCENT: Record<GColor, string> = {
  gblue: "#fbbc04",
  gred: "#4285f4",
  gyellow: "#34a853",
  ggreen: "#fbbc04",
};

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

/**
 * Generated geometric avatar: no photos of real people (brief rule).
 * The pattern is picked from the name so each member keeps the same one.
 * Shapes shift slightly when the parent card (.group) is hovered.
 */
export function Avatar({ name, color, size = 96 }: { name: string; color: GColor; size?: number }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  const variant = hash(name) % 4;
  const ink = "#111";

  return (
    <svg
      role="img"
      aria-label={`Avatar for ${name}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="block shrink-0 rounded-2xl border-[2.5px] border-line"
      style={{ background: FILL[color] }}
    >
      <g className="origin-center [transform-box:fill-box] transition-transform duration-200 [transition-timing-function:var(--ease-out)] group-hover:rotate-6 group-hover:scale-105 motion-reduce:transition-none">
        {variant === 0 && <circle cx="90" cy="90" r="24" fill={ACCENT[color]} stroke={ink} strokeWidth="3" />}
        {variant === 1 && <rect x="62" y="-8" width="44" height="44" rx="8" transform="rotate(18 84 14)" fill={ACCENT[color]} stroke={ink} strokeWidth="3" />}
        {variant === 2 && <path d="M0 100 L0 64 A36 36 0 0 1 36 100 Z" fill={ACCENT[color]} stroke={ink} strokeWidth="3" />}
        {variant === 3 &&
          [8, 18, 28].map((y) => <rect key={y} x="70" y={y} width="40" height="6" rx="3" fill="#fff" stroke={ink} strokeWidth="2.5" />)}
      </g>
      <text
        x="50"
        y="54"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ink}
        style={{ fontFamily: "var(--nf-display)", fontWeight: 700, fontSize: 34, letterSpacing: "-0.02em" }}
      >
        {initials}
      </text>
    </svg>
  );
}
