/**
 * Page backdrop: big outlined Google-colour shapes pinned to the viewport edges,
 * so they peek out from behind the tiles. Static (no scroll motion), pure SVG,
 * hidden from assistive tech. The graph-paper grid itself lives on <body> in globals.css.
 */
export function BackgroundArt() {
  const stroke = "var(--line)";
  const sw = 3;
  return (
    <div aria-hidden="true" className="bg-art pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Top-left: yellow circle */}
      <svg className="absolute -left-24 -top-24 h-72 w-72 sm:h-96 sm:w-96" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="96" fill="var(--g-yellow)" stroke={stroke} strokeWidth={sw} />
        <circle cx="100" cy="100" r="60" fill="none" stroke={stroke} strokeWidth={sw} strokeDasharray="6 8" />
      </svg>

      {/* Right edge: blue rounded square, tilted */}
      <svg className="absolute -right-20 top-[38%] hidden h-56 w-56 rotate-12 md:block md:h-72 md:w-72" viewBox="0 0 200 200">
        <rect x="6" y="6" width="188" height="188" rx="36" fill="var(--g-blue)" stroke={stroke} strokeWidth={sw} />
        <path d="M60 100 L84 76 M60 100 L84 124 M140 100 L116 76 M140 100 L116 124" stroke={stroke} strokeWidth="7" strokeLinecap="round" />
      </svg>

      {/* Bottom-left: red triangle */}
      <svg className="absolute -bottom-28 -left-24 h-56 w-56 -rotate-6 md:-bottom-16 md:-left-10 md:h-72 md:w-72" viewBox="0 0 200 200">
        <path d="M100 8 L192 184 L8 184 Z" fill="var(--g-red)" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      </svg>

      {/* Bottom-right: green plus */}
      <svg className="absolute -bottom-24 -right-24 h-48 w-48 rotate-[18deg] md:-bottom-10 md:-right-10 md:h-60 md:w-60" viewBox="0 0 200 200">
        <path
          d="M70 8 H130 V70 H192 V130 H130 V192 H70 V130 H8 V70 H70 Z"
          fill="var(--g-green)"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      </svg>

      {/* Small accents in the wide-screen gutters */}
      <svg className="absolute left-[3%] top-[55%] hidden h-24 w-24 xl:block" viewBox="0 0 100 100">
        <path d="M6 50 Q 20 20 34 50 T 62 50 T 94 50" fill="none" stroke="var(--g-blue)" strokeWidth="8" strokeLinecap="round" />
      </svg>
      <svg className="absolute right-[4%] top-[14%] hidden h-16 w-16 xl:block" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--g-red)" strokeWidth="12" />
      </svg>
      <svg className="absolute bottom-[22%] right-[6%] hidden h-14 w-14 xl:block" viewBox="0 0 100 100">
        <rect x="14" y="14" width="72" height="72" rx="12" fill="var(--g-yellow)" stroke={stroke} strokeWidth="5" transform="rotate(20 50 50)" />
      </svg>
    </div>
  );
}
