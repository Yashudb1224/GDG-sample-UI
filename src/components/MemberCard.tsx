"use client";

import { useId, useState } from "react";
import { BG } from "@/lib/site";
import type { Member } from "@/data/team";
import { Avatar } from "./Avatar";

function Links({ member }: { member: Member }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {member.links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            aria-label={`${member.name} on ${l.label}`}
            className="inline-flex min-h-11 items-center rounded-full border-[2.5px] border-line bg-surface px-4 text-sm font-semibold transition-colors duration-150 hover:bg-surface-2"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Badge-style card with a lanyard slot. "featured" shows everything; the default expands on demand. */
export function MemberCard({ member, featured = false }: { member: Member; featured?: boolean }) {
  const [open, setOpen] = useState(false);
  const regionId = useId();
  const first = member.name.split(" ")[0];

  const header = (
    <div className={`${BG[member.color]} relative h-14 border-b-[2.5px] border-line`}>
      {/* Lanyard slot */}
      <span aria-hidden="true" className="absolute left-1/2 top-4 h-3 w-14 -translate-x-1/2 rounded-full border-[2.5px] border-line bg-bg" />
    </div>
  );

  if (featured) {
    return (
      <article className="nb-card group flex h-full flex-col overflow-hidden">
        {header}
        <div className="flex flex-1 flex-col gap-5 p-6 sm:flex-row sm:items-start">
          <div className="relative z-10 -mt-14 self-start sm:-mt-16">
            <Avatar name={member.name} color={member.color} size={112} />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <h3 className="font-display text-2xl font-bold">{member.name}</h3>
              <p className="font-semibold">{member.role}</p>
              <p className="font-mono text-xs text-muted">{member.year}</p>
            </div>
            {member.bio && <p className="max-w-[55ch] text-muted">{member.bio}</p>}
            <div className="mt-auto pt-1">
              <Links member={member} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="nb-card nb-lift group flex h-full flex-col overflow-hidden">
      {header}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="relative z-10 -mt-12 self-start">
          <Avatar name={member.name} color={member.color} size={80} />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold leading-snug">{member.name}</h3>
          <p className="font-semibold">{member.role}</p>
          <p className="font-mono text-xs text-muted">{member.year}</p>
        </div>

        {/* Expanding region: grid-rows 0fr → 1fr animates height without measuring */}
        <div
          id={regionId}
          inert={!open}
          className={`grid transition-[grid-template-rows,opacity] duration-200 [transition-timing-function:var(--ease-out)] motion-reduce:transition-none ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="space-y-4 overflow-hidden">
            {member.bio && <p className="text-sm text-muted">{member.bio}</p>}
            <Links member={member} />
          </div>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={regionId}
          onClick={() => setOpen((o) => !o)}
          className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 rounded-full border-[2.5px] border-line px-4 text-sm font-semibold transition-colors duration-150 hover:bg-surface-2"
        >
          {open ? "Show less" : member.bio ? `About ${first}` : `Find ${first} online`}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--ease-out)] ${open ? "rotate-45" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </article>
  );
}
