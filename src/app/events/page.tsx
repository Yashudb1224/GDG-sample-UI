import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { EventsBrowser } from "@/components/EventsBrowser";
import { formatDate, formatTime, upcomingEvents } from "@/data/events";

export const metadata = {
  title: "Events",
  description: "Workshops, hackathons, study jams, talks and contests run by GDG on Campus RVCE.",
};

export default function EventsPage() {
  const upcoming = upcomingEvents();
  const featured = upcoming.find((e) => e.featured) ?? upcoming[0];

  return (
    <div className="space-y-10 pt-8 sm:pt-10">
      <header className="grid gap-5 lg:grid-cols-5">
        <div data-enter="" className="nb-card flex flex-col justify-center gap-4 p-6 sm:p-10 lg:col-span-3">
          <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">Events</h1>
          <p className="max-w-[55ch] text-lg text-muted">
            Workshops, hackathons, study jams, talks and contests. Every event is open to RVCE students; registration
            happens on the chapter&apos;s GDG community page.
          </p>
        </div>

        {featured && (
          <article
            data-enter=""
            style={{ "--enter-delay": "90ms" } as React.CSSProperties}
            aria-labelledby="featured-title"
            className="nb-card flex flex-col gap-4 bg-gblue p-6 text-on-color lg:col-span-2"
          >
            <span className="nb-tag nb-tag-on-color self-start">Featured · {featured.type}</span>
            <h2 id="featured-title" className="font-display text-2xl font-bold leading-tight">
              {featured.title}
            </h2>
            <p className="font-mono text-sm font-semibold">
              {formatDate(featured.start, { weekday: "short" })} · {formatTime(featured.start)} IST · {featured.venue}
            </p>
            <Countdown to={featured.start} />
            <Link href={`/events/${featured.slug}`} className="nb-btn mt-auto border-on-color bg-white text-on-color shadow-[3px_3px_0_#111]">
              View event details
            </Link>
          </article>
        )}
      </header>

      <EventsBrowser />
    </div>
  );
}
