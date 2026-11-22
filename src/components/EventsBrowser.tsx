"use client";

import { useId, useMemo, useState } from "react";
import { EVENTS, EVENT_TYPES, formatDate, isPast, type EventType, type GdgEvent } from "@/data/events";
import { EventCard } from "./EventCard";

type When = "upcoming" | "past" | "all";
type Mode = "any" | "In person" | "Online";

const WHEN: { value: When; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "all", label: "All" },
];
const MODES: { value: Mode; label: string }[] = [
  { value: "any", label: "Any format" },
  { value: "In person", label: "In person" },
  { value: "Online", label: "Online" },
];

function matches(e: GdgEvent, q: string) {
  if (!q) return true;
  const hay = [e.title, e.summary, e.type, e.domain ?? "", e.venue, ...e.tags].join(" ").toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((w) => hay.includes(w));
}

/** Chip styled as a toggle. aria-pressed carries the state for screen readers. */
function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`min-h-11 shrink-0 rounded-full border-[2.5px] border-line px-4 text-sm font-semibold transition-[transform,box-shadow] duration-150 [transition-timing-function:var(--ease-out)] active:translate-x-0.5 active:translate-y-0.5 ${
        pressed ? "bg-ink text-bg shadow-none" : "bg-surface shadow-[3px_3px_0_var(--line)]"
      }`}
    >
      {children}
    </button>
  );
}

export function EventsBrowser() {
  const [query, setQuery] = useState("");
  const [when, setWhen] = useState<When>("upcoming");
  const [types, setTypes] = useState<EventType[]>([]);
  const [mode, setMode] = useState<Mode>("any");
  const searchId = useId();

  const results = useMemo(() => {
    const now = new Date();
    const list = EVENTS.filter((e) => {
      const past = isPast(e, now);
      if (when === "upcoming" && past) return false;
      if (when === "past" && !past) return false;
      if (types.length && !types.includes(e.type)) return false;
      if (mode !== "any" && e.mode !== mode) return false;
      return matches(e, query.trim());
    });
    // Upcoming reads soonest-first; past reads most-recent-first
    const dir = when === "past" ? -1 : 1;
    return list.sort((a, b) => dir * (+new Date(a.start) - +new Date(b.start)));
  }, [query, when, types, mode]);

  // Upcoming: by month, like a timeline. Past: one grid. All: upcoming then past.
  const groups = useMemo(() => {
    const now = new Date();
    if (when === "past") return [["Past events", results]] as [string, GdgEvent[]][];
    if (when === "all") {
      return (
        [
          ["Upcoming", results.filter((e) => !isPast(e, now))],
          ["Past", results.filter((e) => isPast(e, now)).reverse()],
        ] as [string, GdgEvent[]][]
      ).filter(([, l]) => l.length);
    }
    const map = new Map<string, GdgEvent[]>();
    for (const e of results) {
      const key = formatDate(e.start, { day: undefined, month: "long", year: "numeric" });
      map.set(key, [...(map.get(key) ?? []), e]);
    }
    return [...map.entries()];
  }, [results, when]);

  const filtersActive = query !== "" || types.length > 0 || mode !== "any";
  const reset = () => {
    setQuery("");
    setTypes([]);
    setMode("any");
  };
  const toggleType = (t: EventType) => setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
  const now = new Date();

  return (
    <div className="space-y-8">
      {/* ---------- Filter panel ---------- */}
      <div className="nb-card space-y-5 p-4 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label htmlFor={searchId} className="mb-2 block text-sm font-bold">
              Search events
            </label>
            <div className="relative">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “flutter”, “online” or “ML”"
                className="h-12 w-full rounded-full border-[2.5px] border-line bg-bg pl-12 pr-4 text-base placeholder:text-muted focus-visible:outline-offset-2"
              />
            </div>
          </div>

          <div role="group" aria-label="When" className="flex rounded-full border-[2.5px] border-line bg-bg p-1">
            {WHEN.map((w) => (
              <button
                key={w.value}
                type="button"
                aria-pressed={when === w.value}
                onClick={() => setWhen(w.value)}
                className={`min-h-10 flex-1 rounded-full px-4 text-sm font-semibold transition-colors duration-150 lg:flex-none ${
                  when === w.value ? "bg-gblue text-on-color" : "hover:bg-surface-2"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p id="type-label" className="text-sm font-bold">
            Type
          </p>
          {/* Scrolls sideways on small screens instead of wrapping into a wall of chips */}
          <div role="group" aria-labelledby="type-label" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 pt-0.5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <Chip pressed={types.length === 0} onClick={() => setTypes([])}>
              All types
            </Chip>
            {EVENT_TYPES.map((t) => (
              <Chip key={t} pressed={types.includes(t)} onClick={() => toggleType(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p id="mode-label" className="text-sm font-bold">
              Format
            </p>
            <div role="group" aria-labelledby="mode-label" className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <Chip key={m.value} pressed={mode === m.value} onClick={() => setMode(m.value)}>
                  {m.label}
                </Chip>
              ))}
            </div>
          </div>
          {filtersActive && (
            <button type="button" onClick={reset} className="min-h-11 font-semibold underline underline-offset-4">
              Clear filters
            </button>
          )}
        </div>
      </div>

      <p role="status" className="font-mono text-sm font-semibold text-muted">
        {results.length === 1 ? "1 event" : `${results.length} events`}
      </p>

      {/* ---------- Results ---------- */}
      {results.length === 0 ? (
        <div className="nb-card flex flex-col items-center gap-4 p-10 text-center">
          <p className="font-display text-2xl font-bold">No events match those filters.</p>
          <p className="text-muted">Try a different word, or look through past events.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {filtersActive && (
              <button type="button" onClick={reset} className="nb-btn bg-gyellow text-on-color">
                Clear filters
              </button>
            )}
            {when !== "all" && (
              <button type="button" onClick={() => setWhen("all")} className="nb-btn bg-surface">
                Show all events
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {groups.map(([month, list]) => (
            <section key={month} aria-label={month}>
              <h2 className="mb-4 flex items-center gap-3 font-mono text-sm font-semibold uppercase tracking-wider text-muted">
                {month}
                <span aria-hidden="true" className="h-[2.5px] flex-1 bg-line opacity-20" />
              </h2>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((e) => (
                  <li key={e.slug}>
                    <EventCard event={e} past={isPast(e, now)} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
