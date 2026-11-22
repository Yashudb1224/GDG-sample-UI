"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { GdgEvent } from "@/data/events";

const icsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const esc = (s: string) => s.replace(/[\\,;]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");

function placeOf(event: GdgEvent) {
  return event.mode === "In person" ? `${event.venue}, RV College of Engineering, Bengaluru` : event.venue;
}

/** Pre-filled "new event" links. Only the event's own public details go in the URL. */
function googleUrl(event: GdgEvent) {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${icsDate(event.start)}/${icsDate(event.end)}`,
    details: event.summary,
    location: placeOf(event),
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

function outlookUrl(event: GdgEvent) {
  const p = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    startdt: new Date(event.start).toISOString(),
    enddt: new Date(event.end).toISOString(),
    body: event.summary,
    location: placeOf(event),
  });
  return `https://outlook.live.com/calendar/0/action/compose?${p}`;
}

/** Builds a .ics file in the browser for Apple Calendar and other apps. */
function downloadIcs(event: GdgEvent) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GDG RVCE//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.slug}@gdg-rvce`,
    `DTSTAMP:${icsDate(new Date().toISOString())}`,
    `DTSTART:${icsDate(event.start)}`,
    `DTEND:${icsDate(event.end)}`,
    `SUMMARY:${esc(event.title)}`,
    `DESCRIPTION:${esc(event.summary)}`,
    `LOCATION:${esc(placeOf(event))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.slug}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

const OPTION =
  "flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border-[2.5px] border-line bg-surface px-4 text-sm font-semibold transition-colors duration-150 hover:bg-surface-2";

/** "Add to calendar" opens a short list of choices instead of forcing a file download. */
export function AddToCalendar({ event }: { event: GdgEvent }) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const wrap = useRef<HTMLDivElement>(null);

  // Escape or a click elsewhere closes the list
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    addEventListener("keydown", onKey);
    addEventListener("click", onClick);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div ref={wrap} className="space-y-2">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="nb-btn w-full bg-surface"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        Add to calendar
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--ease-out)] ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id={listId}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-200 [transition-timing-function:var(--ease-out)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="space-y-2 overflow-hidden p-0.5">
          <li>
            <a href={googleUrl(event)} target="_blank" rel="noopener noreferrer" className={OPTION} onClick={() => setOpen(false)}>
              Google Calendar
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={outlookUrl(event)} target="_blank" rel="noopener noreferrer" className={OPTION} onClick={() => setOpen(false)}>
              Outlook.com
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <button
              type="button"
              className={OPTION}
              onClick={() => {
                downloadIcs(event);
                setOpen(false);
              }}
            >
              Download .ics file
              <span className="font-mono text-xs font-medium text-muted">Apple, others</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
