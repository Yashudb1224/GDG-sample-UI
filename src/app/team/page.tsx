import { MemberCard } from "@/components/MemberCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TEAM } from "@/data/team";
import { SITE, type GColor } from "@/lib/site";

export const metadata = {
  title: "Team",
  description: "The students who run GDG on Campus RVCE: chapter leads, tech leads and the operations team.",
};

const GROUP_COLOR: Record<string, GColor> = { leads: "gblue", tech: "gred", ops: "ggreen" };

export default function TeamPage() {
  const [leads, ...rest] = TEAM;

  return (
    <div className="space-y-16 pt-8 sm:pt-10">
      <header className="grid gap-5 lg:grid-cols-5">
        <div data-enter="" className="nb-card flex flex-col justify-center gap-4 p-6 sm:p-10 lg:col-span-3">
          <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">Team</h1>
          <p className="max-w-[55ch] text-lg text-muted">
            The students who plan the events, review the pull requests and book the rooms. Everyone here started as a
            member at a workshop.
          </p>
        </div>
        <div
          data-enter=""
          style={{ "--enter-delay": "90ms" } as React.CSSProperties}
          className="nb-card flex flex-col justify-between gap-5 bg-gyellow p-6 text-on-color lg:col-span-2"
        >
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold leading-tight">Want to help run the chapter?</h2>
            <p>Core team applications open at the start of each semester. Join the community page to hear first.</p>
          </div>
          <a href={SITE.joinUrl} className="nb-btn self-start border-on-color bg-white text-on-color shadow-[3px_3px_0_#111]">
            Join on the GDG community page
          </a>
        </div>
      </header>

      <section aria-labelledby="leads-title">
        <SectionHeading id="leads-title" title={leads.title} color={GROUP_COLOR[leads.id]} />
        <p className="-mt-3 mb-6 max-w-[60ch] text-muted">{leads.blurb}</p>
        <ul className="grid gap-5 pt-6 lg:grid-cols-2">
          {leads.members.map((m) => (
            <li key={m.slug}>
              <MemberCard member={m} featured />
            </li>
          ))}
        </ul>
      </section>

      {rest.map((group) => (
        <section key={group.id} aria-labelledby={`${group.id}-title`}>
          <SectionHeading id={`${group.id}-title`} title={group.title} color={GROUP_COLOR[group.id]} />
          <p className="-mt-3 mb-6 max-w-[60ch] text-muted">{group.blurb}</p>
          <ul className="grid items-start gap-5 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {group.members.map((m) => (
              <li key={m.slug} className="h-full">
                <MemberCard member={m} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
