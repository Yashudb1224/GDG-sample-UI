import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCalendar } from "@/components/AddToCalendar";
import { Countdown } from "@/components/Countdown";
import { EventCard } from "@/components/EventCard";
import { BG } from "@/lib/site";
import { EVENTS, formatDate, formatTime, getEvent, isPast, upcomingEvents } from "@/data/events";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = getEvent((await params).slug);
  return event ? { title: event.title, description: event.summary } : {};
}

export default async function EventDetailPage({ params }: Props) {
  const event = getEvent((await params).slug);
  if (!event) notFound();

  const past = isPast(event);
  const sameDay = formatDate(event.start, { year: "numeric" }) === formatDate(event.end, { year: "numeric" });
  const when = sameDay
    ? `${formatTime(event.start)} – ${formatTime(event.end)} IST`
    : `${formatTime(event.start)} IST, until ${formatDate(event.end, { weekday: "short" })} ${formatTime(event.end)}`;
  const more = upcomingEvents()
    .filter((e) => e.slug !== event.slug)
    .sort((a, b) => Number(b.domain === event.domain) - Number(a.domain === event.domain))
    .slice(0, 3);

  return (
    <div className="space-y-12 pt-8 sm:pt-10">
      <Link href="/events" className="inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline">
        <span aria-hidden="true">←</span> All events
      </Link>

      {/* ---------- Ticket: main panel + tear-off stub ---------- */}
      <article data-enter="" aria-labelledby="event-title" className="nb-card relative grid overflow-visible lg:grid-cols-[1fr_340px]">
        <div className={`${BG[event.color]} flex flex-col gap-5 rounded-t-[calc(var(--radius)-2px)] p-6 text-on-color sm:p-10 lg:rounded-l-[calc(var(--radius)-2px)] lg:rounded-tr-none`}>
          <div className="flex flex-wrap gap-2">
            <span className="nb-tag nb-tag-on-color">{event.type}</span>
            {event.domain && <span className="nb-tag nb-tag-on-color">{event.domain}</span>}
            <span className="nb-tag nb-tag-on-color">{event.mode}</span>
            {past && <span className="nb-tag nb-tag-on-color">Ended</span>}
          </div>
          <h1 id="event-title" className="max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            {event.title}
          </h1>
          <p className="max-w-[55ch] text-lg font-medium">{event.summary}</p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Tags">
            {event.tags.map((t) => (
              <li key={t} className="font-mono text-sm font-semibold">
                #{t.toLowerCase().replace(/\s+/g, "-")}
              </li>
            ))}
          </ul>
        </div>

        <aside
          aria-label="Event details"
          className="relative flex flex-col gap-5 border-t-[2.5px] border-dashed border-line p-6 sm:p-8 lg:border-l-[2.5px] lg:border-t-0"
        >
          {/* Ticket notches: half-circles punched into the card edge at each end of the tear line */}
          <span aria-hidden="true" className="notch absolute -left-[14.5px] -top-[10.75px] [clip-path:inset(0_0_0_50%)] lg:hidden" />
          <span aria-hidden="true" className="notch absolute -right-[14.5px] -top-[10.75px] [clip-path:inset(0_50%_0_0)] lg:hidden" />
          <span aria-hidden="true" className="notch absolute -left-[10.75px] -top-[14.5px] hidden [clip-path:inset(50%_0_0_0)] lg:block" />
          <span aria-hidden="true" className="notch absolute -bottom-[14.5px] -left-[10.75px] hidden [clip-path:inset(0_0_50%_0)] lg:block" />
          <dl className="space-y-4">
            <div>
              <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">Date</dt>
              <dd className="font-display text-3xl font-bold">{formatDate(event.start, { weekday: "short", year: "numeric" })}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">Time</dt>
              <dd className="text-lg font-semibold">{when}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">{event.mode === "Online" ? "Where" : "Venue"}</dt>
              <dd className="text-lg font-semibold">{event.venue}</dd>
              {event.mode === "In person" && <dd className="text-sm text-muted">RV College of Engineering, Bengaluru</dd>}
            </div>
          </dl>

          {past ? (
            <p className="rounded-xl border-[2.5px] border-line bg-surface-2 p-4 text-sm font-semibold">
              This event has ended. The recap is below.
            </p>
          ) : (
            <div className="mt-auto space-y-3">
              {event.registerUrl && (
                <a href={event.registerUrl} className="nb-btn w-full bg-gyellow text-on-color" target="_blank" rel="noopener noreferrer">
                  Register for this event
                  <span className="sr-only">(opens the GDG community page in a new tab)</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              <AddToCalendar event={event} />
              <p className="text-center text-xs text-muted">Registration opens on the chapter&apos;s GDG community page.</p>
            </div>
          )}
        </aside>
      </article>

      {/* ---------- Body ---------- */}
      <div className="grid gap-5 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-3">
          {(event.about || event.recap) && (
            <section aria-labelledby="about-title" className="nb-card p-6 sm:p-8">
              <h2 id="about-title" className="mb-3 font-display text-2xl font-bold">
                {past ? "Recap" : "About this event"}
              </h2>
              <p className="max-w-[65ch] leading-relaxed text-muted">{past ? event.recap ?? event.about : event.about}</p>
            </section>
          )}

          {event.agenda && (
            <section aria-labelledby="agenda-title" className="nb-card p-6 sm:p-8">
              <h2 id="agenda-title" className="mb-5 font-display text-2xl font-bold">
                Agenda
              </h2>
              <ol className="relative space-y-5 border-l-[2.5px] border-line pl-6">
                {event.agenda.map((a, i) => (
                  <li key={a.time} className="relative">
                    <span
                      aria-hidden="true"
                      className={`${BG[(["gblue", "gred", "gyellow", "ggreen"] as const)[i % 4]]} absolute -left-[34px] top-1 h-4 w-4 rounded-full border-[2.5px] border-line`}
                    />
                    <p className="font-mono text-sm font-semibold text-muted">{a.time}</p>
                    <p className="font-semibold">{a.title}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <div className="space-y-5 lg:col-span-2">
          {!past && (
            <section aria-labelledby="countdown-title" className="nb-card bg-gyellow p-6 text-on-color">
              <h2 id="countdown-title" className="mb-4 font-display text-xl font-bold">
                Starts in
              </h2>
              <Countdown to={event.start} />
            </section>
          )}
          {event.bring && (
            <section aria-labelledby="bring-title" className="nb-card p-6">
              <h2 id="bring-title" className="mb-3 font-display text-xl font-bold">
                What to bring
              </h2>
              <ul className="space-y-2">
                {event.bring.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1.5 h-3 w-3 shrink-0 rounded-sm border-2 border-line bg-ggreen" />
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {more.length > 0 && (
        <section aria-labelledby="more-title">
          <h2 id="more-title" className="mb-6 font-display text-3xl font-bold tracking-tight">
            More upcoming events
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((e) => (
              <li key={e.slug}>
                <EventCard event={e} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
