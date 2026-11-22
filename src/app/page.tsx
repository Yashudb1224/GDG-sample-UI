import Link from "next/link";
import type { CSSProperties } from "react";
import { Countdown } from "@/components/Countdown";
import { EventCard } from "@/components/EventCard";
import { SectionHeading } from "@/components/SectionHeading";
import { BG, COMMUNITY_LINKS, DOMAINS, SITE, type GColor } from "@/lib/site";
import { EVENTS, LATEST_RECAP, formatDate, upcomingEvents } from "@/data/events";

const WHAT_WE_DO: { title: string; body: string; color: GColor; glyph: string; span: string }[] = [
  { title: "Workshops", body: "Three-hour, laptop-open sessions. You leave with the thing running on your own machine.", color: "gblue", glyph: "</>", span: "lg:col-span-4" },
  { title: "Hackathons", body: "Overnight sprints in teams of up to four, with mentors walking the floor.", color: "gred", glyph: "{ }", span: "lg:col-span-2" },
  { title: "Study Jams", body: "A track learned over a few weeks, one guided lab per session.", color: "gyellow", glyph: "[ ]", span: "lg:col-span-2" },
  { title: "Tech Talks", body: "Students and guests walk through something they built and what broke along the way.", color: "ggreen", glyph: "( )", span: "lg:col-span-4" },
];

// Abstract tiles stand in for event photos until real, consented images are available.
const GALLERY: { color: GColor; span: string; shape: "circle" | "bars" | "grid" | "tri" }[] = [
  { color: "gblue", span: "col-span-2 row-span-2", shape: "circle" },
  { color: "gyellow", span: "", shape: "bars" },
  { color: "ggreen", span: "", shape: "grid" },
  { color: "gred", span: "col-span-2", shape: "tri" },
];

const enter = (delay: number, y = 10) => ({ "--enter-delay": `${delay}ms`, "--enter-y": `${y}px` }) as CSSProperties;

export default function HomePage() {
  const upcoming = upcomingEvents();
  const featured = upcoming.find((e) => e.featured) ?? upcoming[0];
  const others = upcoming.filter((e) => e.slug !== featured?.slug).slice(0, 3);
  const recapEvent = EVENTS.find((e) => e.slug === LATEST_RECAP.eventSlug);

  return (
    <div className="space-y-20 pt-8 sm:pt-10">
      {/* ---------- Hero bento: one entrance per tile, lead first ---------- */}
      <section aria-labelledby="hero-title" className="grid gap-4 sm:gap-5 lg:grid-cols-6">
        <div data-enter="" style={enter(0, 18)} className="nb-card relative flex flex-col justify-between gap-8 overflow-hidden p-6 sm:p-10 lg:col-span-4 lg:row-span-2">
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 hidden h-48 w-48 rounded-full border-[2.5px] border-line bg-gyellow sm:block" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-2 top-24 hidden h-20 w-20 rotate-12 rounded-xl border-[2.5px] border-line bg-ggreen sm:block" />

          <div className="relative space-y-5">
            <p className="font-mono text-sm font-semibold text-muted sm:pr-40">
              {SITE.name} · {SITE.location}
            </p>
            <h1 id="hero-title" className="max-w-2xl font-display text-[2.6rem] font-bold leading-[1] tracking-tight sm:text-6xl">
              Learn,{" "}
              <span className="relative whitespace-nowrap">
                <span aria-hidden="true" className="absolute inset-x-[-0.1em] bottom-[0.08em] h-[0.38em] bg-gblue" />
                <span className="relative">build</span>
              </span>{" "}
              and ship with RVCE&apos;s developer community.
            </h1>
            <p className="max-w-[60ch] text-lg text-muted">
              Students from every branch and year working on machine learning, open source, competitive programming
              and research, through workshops, hackathons and study jams. Part of the worldwide Google Developer
              Groups network.
            </p>
          </div>

          <div className="relative flex flex-wrap gap-3">
            <Link href="/events" className="nb-btn bg-gblue text-on-color">
              Explore events <span aria-hidden="true">→</span>
            </Link>
            <Link href="/team" className="nb-btn bg-surface">
              Meet the team
            </Link>
          </div>
        </div>

        {featured && (
          <article data-enter="" style={enter(90)} aria-labelledby="next-up" className="nb-card flex flex-col gap-4 bg-gyellow p-6 text-on-color lg:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <span className="nb-tag nb-tag-on-color">Next up · {featured.type}</span>
              <span className="font-mono text-xs font-semibold">{formatDate(featured.start)}</span>
            </div>
            <h2 id="next-up" className="font-display text-2xl font-bold leading-tight">
              {featured.title}
            </h2>
            <Countdown to={featured.start} />
            <Link href={`/events/${featured.slug}`} className="nb-btn mt-auto border-on-color bg-white text-on-color shadow-[3px_3px_0_#111]">
              View event details
            </Link>
          </article>
        )}

        <div data-enter="" style={enter(150)} className="nb-card overflow-hidden bg-[#16181d] text-[#f3f1ea] lg:col-span-2">
          <div className="flex items-center gap-1.5 border-b-[2.5px] border-line px-4 py-2.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-gred" />
            <span className="h-3 w-3 rounded-full bg-gyellow" />
            <span className="h-3 w-3 rounded-full bg-ggreen" />
            <span className="ml-2 font-mono text-xs text-[#b8b5ad]">join.ts</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
            <code>
              <span className="text-[#8ab4ff]">const</span> you = <span className="text-[#fdd663]">member</span>({"{"}
              {"\n"}  curious: <span className="text-[#81c995]">true</span>,
              {"\n"}  experience: <span className="text-[#f28b82]">&quot;any&quot;</span>,
              {"\n"}{"}"});
            </code>
          </pre>
          <div className="px-4 pb-4">
            <a href="#join" className="inline-flex min-h-11 items-center font-mono text-sm font-semibold text-[#fdd663] underline underline-offset-4">
              $ npm run join
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Upcoming events ---------- */}
      <section aria-labelledby="upcoming-title">
        <SectionHeading id="upcoming-title" title="Upcoming events" color="gblue" action={{ href: "/events", label: "See all events" }} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      </section>

      {/* ---------- What we do ---------- */}
      <section aria-labelledby="do-title">
        <SectionHeading id="do-title" title="What we run" color="gred" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {WHAT_WE_DO.map((item) => (
            <li key={item.title} className={`nb-card flex flex-col gap-3 p-5 ${item.span}`}>
              <span aria-hidden="true" className={`${BG[item.color]} grid h-12 w-12 place-items-center rounded-xl border-[2.5px] border-line font-mono text-sm font-bold text-on-color`}>
                {item.glyph}
              </span>
              <h3 className="font-display text-xl font-bold">{item.title}</h3>
              <p className="max-w-[60ch] text-sm text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Domains ---------- */}
      <section aria-labelledby="domains-title">
        <SectionHeading id="domains-title" title="What members work on" color="gyellow" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DOMAINS.map((d) => (
            <li key={d.title} className={`nb-card ${BG[d.color]} flex flex-col gap-3 p-5 text-on-color`}>
              <span aria-hidden="true" className="grid h-12 min-w-12 place-items-center self-start rounded-xl border-[2.5px] border-on-color bg-white px-2 font-mono text-sm font-bold">
                {d.glyph}
              </span>
              <h3 className="font-display text-xl font-bold leading-snug">{d.title}</h3>
              <p className="text-sm">{d.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Latest recap ---------- */}
      <section aria-labelledby="recap-title">
        <SectionHeading id="recap-title" title="Latest recap" color="ggreen" />
        <div className="grid gap-5 lg:grid-cols-5">
          <div className="nb-card grid grid-cols-4 grid-rows-2 gap-3 p-3 lg:col-span-3" role="img" aria-label={`Photo gallery placeholder for ${LATEST_RECAP.title}`}>
            {GALLERY.map((g, i) => (
              <div key={i} className={`${BG[g.color]} ${g.span} relative min-h-28 overflow-hidden rounded-lg border-[2.5px] border-line`}>
                <GalleryShape shape={g.shape} />
              </div>
            ))}
          </div>

          <div className="nb-card flex flex-col gap-4 p-6 lg:col-span-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
              {formatDate(LATEST_RECAP.date, { year: "numeric" })}
            </p>
            <h3 className="font-display text-2xl font-bold">{LATEST_RECAP.title}</h3>
            <p className="text-muted">{LATEST_RECAP.summary}</p>
            <div>
              <h4 className="mb-2 text-sm font-bold">Sessions included</h4>
              <ul className="flex flex-wrap gap-2">
                {LATEST_RECAP.topics.map((t) => (
                  <li key={t} className="nb-tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {recapEvent && (
              <Link href={`/events/${recapEvent.slug}`} className="nb-btn mt-auto self-start bg-ggreen text-on-color">
                Read the recap
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Community links ---------- */}
      <section id="join" aria-labelledby="join-title" className="scroll-mt-28">
        <SectionHeading id="join-title" title="Find us online" color="gblue" action={{ href: SITE.joinUrl, label: "Join on the GDG community page" }} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITY_LINKS.map((c) => (
            <li key={c.label} className="nb-card nb-lift relative flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <span aria-hidden="true" className={`${BG[c.color]} h-4 w-10 rounded-full border-2 border-line`} />
                <span aria-hidden="true" className="font-mono text-lg">↗</span>
              </div>
              <h3 className="font-display text-xl font-bold">
                <a href={c.href} className="after:absolute after:inset-0 after:rounded-[var(--radius)] after:content-['']">
                  {c.label}
                </a>
              </h3>
              <p className="font-mono text-xs text-muted">{c.handle}</p>
              <p className="text-sm text-muted">{c.blurb}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function GalleryShape({ shape }: { shape: "circle" | "bars" | "grid" | "tri" }) {
  const stroke = "#111";
  switch (shape) {
    case "circle":
      return (
        <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <circle cx="130" cy="80" r="46" fill="#fff" stroke={stroke} strokeWidth="5" />
          <rect x="30" y="120" width="110" height="50" rx="10" fill="#fbbc04" stroke={stroke} strokeWidth="5" />
        </svg>
      );
    case "bars":
      return (
        <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          {[20, 40, 60, 80].map((x, i) => (
            <rect key={x} x={x - 6} y={70 - i * 12} width="12" height={30 + i * 12} fill="#fff" stroke={stroke} strokeWidth="4" />
          ))}
        </svg>
      );
    case "grid":
      return (
        <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          {[25, 50, 75].flatMap((x) => [25, 50, 75].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#fff" stroke={stroke} strokeWidth="3" />))}
        </svg>
      );
    case "tri":
      return (
        <svg aria-hidden="true" viewBox="0 0 200 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <path d="M20 85 L70 20 L120 85 Z" fill="#fff" stroke={stroke} strokeWidth="5" />
          <path d="M100 85 L140 40 L180 85 Z" fill="#4285f4" stroke={stroke} strokeWidth="5" />
        </svg>
      );
  }
}
