import Link from "next/link";
import { BG } from "@/lib/site";
import { formatDate, formatTime, type GdgEvent } from "@/data/events";

export function EventCard({ event, past = false }: { event: GdgEvent; past?: boolean }) {
  const month = formatDate(event.start, { day: undefined, month: "short" }).toUpperCase();
  const day = formatDate(event.start, { day: "numeric", month: undefined });

  return (
    <article className="nb-card nb-lift relative flex h-full flex-col overflow-hidden">
      <div className={`${BG[event.color]} flex items-start justify-between gap-3 border-b-[2.5px] border-line p-4 text-on-color`}>
        <div className="flex flex-wrap gap-1.5">
          <span className="nb-tag nb-tag-on-color">{event.type}</span>
          {past && <span className="nb-tag nb-tag-on-color">Past</span>}
        </div>
        <span className="flex shrink-0 flex-col items-center rounded-lg border-[2.5px] border-on-color bg-white px-2.5 py-1 leading-none">
          <span className="font-mono text-[11px] font-semibold">{month}</span>
          <span className="font-display text-2xl font-bold">{day}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-xl font-bold leading-snug">
          {/* Stretched link: the whole card is clickable, one tab stop */}
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0 after:rounded-[var(--radius)] after:content-['']">
            {event.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{event.summary}</p>
        <ul className="mt-auto space-y-1 pt-2 font-mono text-[13px]">
          <li>
            <span className="sr-only">Time: </span>
            {formatTime(event.start)} IST
          </li>
          <li>
            <span className="sr-only">Where: </span>
            {event.mode === "Online" ? "● Online" : `● ${event.venue}`}
          </li>
        </ul>
      </div>
    </article>
  );
}
