"use client";

import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

/** Live countdown. Renders dashes on the server so markup matches before hydration. */
export function Countdown({ to }: { to: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const p = now === null ? null : parts(new Date(to).getTime() - now);
  const cells: [string, number | undefined][] = [
    ["days", p?.days],
    ["hrs", p?.hours],
    ["min", p?.mins],
    ["sec", p?.secs],
  ];

  return (
    <div role="timer" aria-live="off" aria-label={p ? `${p.days} days, ${p.hours} hours, ${p.mins} minutes to go` : "Countdown"}>
      <div className="grid grid-cols-4 gap-2" aria-hidden="true">
        {cells.map(([label, v]) => (
          <div key={label} className="rounded-xl border-[2.5px] border-on-color bg-white/60 px-1 py-2 text-center text-on-color">
            <span className="block font-mono text-2xl font-semibold tabular-nums sm:text-3xl">
              {v === undefined ? "--" : String(v).padStart(2, "0")}
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
