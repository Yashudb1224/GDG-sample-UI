import type { GColor } from "@/lib/site";

export const EVENT_TYPES = ["Workshop", "Hackathon", "Study Jam", "Tech Talk", "Contest", "Meetup"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export type GdgEvent = {
  slug: string;
  title: string;
  type: EventType;
  domain?: "Machine Learning" | "Open Source" | "Competitive Programming" | "Research" | "Cloud" | "Mobile";
  /** ISO start time, IST */
  start: string;
  end: string;
  mode: "In person" | "Online";
  venue: string;
  summary: string;
  /** Longer description for the detail page */
  about?: string;
  agenda?: { time: string; title: string }[];
  bring?: string[];
  tags: string[];
  color: GColor;
  featured?: boolean;
  registerUrl?: string;
  recap?: string;
};

// Registration for chapter events happens on the chapter's GDG community page.
const REGISTER = "https://gdg.community.dev/gdg-on-campus-rv-college-of-engineering-bengaluru-india/";

// Sample content only. Events, venues and timings are made up.
export const EVENTS: GdgEvent[] = [
  {
    slug: "build-with-ai-hack-night",
    title: "Build with AI: Hack Night",
    type: "Hackathon",
    domain: "Machine Learning",
    start: "2026-12-12T17:00:00+05:30",
    end: "2026-12-13T09:00:00+05:30",
    mode: "In person",
    venue: "Sample Hall, Main Block",
    summary: "An overnight build sprint. Pick a prompt, form a team of up to four and ship an AI-powered prototype by sunrise.",
    about:
      "Prompts go up at 5 pm. You get sixteen hours, a mentor table that stays open all night, and a demo slot at 8 am. Teams of one to four; if you come alone, the team-forming round at 5:30 pm will find you people. Judging looks at whether the thing works and whether it solves the problem you picked.",
    agenda: [
      { time: "5:00 pm", title: "Prompts revealed, rules walkthrough" },
      { time: "5:30 pm", title: "Team forming for solo participants" },
      { time: "9:00 pm", title: "Mentor check-in round" },
      { time: "2:00 am", title: "Midnight snacks and lightning demos" },
      { time: "8:00 am", title: "Final demos and judging" },
    ],
    bring: ["Laptop and charger", "College ID", "A water bottle", "Any hardware you want to hack on"],
    tags: ["AI", "Teams of 4", "Overnight"],
    color: "gblue",
    featured: true,
    registerUrl: REGISTER,
  },
  {
    slug: "flutter-from-zero",
    title: "Flutter from Zero",
    type: "Workshop",
    domain: "Mobile",
    start: "2026-12-05T14:00:00+05:30",
    end: "2026-12-05T17:00:00+05:30",
    mode: "In person",
    venue: "Lab 3, CSE Block",
    summary: "Build and run your first cross-platform app in three hours. Laptops required, no prior Flutter experience needed.",
    about:
      "We start from an empty folder and end with a to-do app running on your phone. Install the Flutter SDK before you come; the setup guide is pinned in the community Discord.",
    agenda: [
      { time: "2:00 pm", title: "Widgets and layout" },
      { time: "3:00 pm", title: "State and lists" },
      { time: "4:15 pm", title: "Running on your own phone" },
    ],
    bring: ["Laptop with the Flutter SDK installed", "An Android phone and USB cable (optional)"],
    tags: ["Mobile", "Beginner"],
    color: "ggreen",
    registerUrl: REGISTER,
  },
  {
    slug: "cloud-study-jam-week-1",
    title: "Cloud Study Jam: Week 1",
    type: "Study Jam",
    domain: "Cloud",
    start: "2026-12-09T19:00:00+05:30",
    end: "2026-12-09T20:30:00+05:30",
    mode: "Online",
    venue: "Online (link shared after registering)",
    summary: "Guided hands-on labs on deploying containers and serverless functions, with mentors on call.",
    about:
      "The first of four weekly sessions. Each week has two labs; mentors stay on the call to unblock you. Finish all four weeks to complete the track.",
    bring: ["A laptop with a modern browser", "Headphones"],
    tags: ["Cloud", "Hands-on"],
    color: "gyellow",
    registerUrl: REGISTER,
  },
  {
    slug: "open-source-first-pr",
    title: "Your First Open Source PR",
    type: "Tech Talk",
    domain: "Open Source",
    start: "2026-12-18T16:00:00+05:30",
    end: "2026-12-18T17:30:00+05:30",
    mode: "In person",
    venue: "Seminar Room 2, ECE Block",
    summary: "How to find a good first issue, read an unfamiliar codebase and get your pull request merged.",
    about:
      "A walkthrough of one real contribution, from picking the issue to the review comments and the merge. Stay after the talk for a 30-minute session where we pair you with an issue on one of the club's own repositories.",
    tags: ["Open source", "Git"],
    color: "gred",
    registerUrl: REGISTER,
  },
  {
    slug: "paper-circle-diffusion",
    title: "Paper Circle: Diffusion Models",
    type: "Meetup",
    domain: "Research",
    start: "2026-12-20T18:00:00+05:30",
    end: "2026-12-20T19:30:00+05:30",
    mode: "Online",
    venue: "Online (link shared after registering)",
    summary: "Read one paper together, then try to reproduce its key figure in a shared notebook.",
    about:
      "Read the paper beforehand if you can; we spend the first 20 minutes on a summary for anyone who could not. The rest of the session is hands-on in a shared notebook.",
    tags: ["Research", "Papers"],
    color: "ggreen",
    registerUrl: REGISTER,
  },
  {
    slug: "icpc-prep-bootcamp",
    title: "ICPC Prep Bootcamp",
    type: "Contest",
    domain: "Competitive Programming",
    start: "2027-01-10T10:00:00+05:30",
    end: "2027-01-10T16:00:00+05:30",
    mode: "In person",
    venue: "Lab 1, ISE Block",
    summary: "A mock team contest in ICPC format, followed by an editorial session on every problem.",
    tags: ["CP", "Teams of 3"],
    color: "gyellow",
    registerUrl: REGISTER,
  },
  {
    slug: "devfest-recap-2026",
    title: "DevFest Campus Edition 2026",
    type: "Meetup",
    start: "2026-11-08T09:30:00+05:30",
    end: "2026-11-08T18:00:00+05:30",
    mode: "In person",
    venue: "Sample Auditorium",
    summary: "A full day of talks, demos and lightning sessions by students and sample industry speakers.",
    recap:
      "Four tracks across one Saturday: on-device ML, Kubernetes on a laptop, accessible Android UI and Firebase auth. Slides and code from every session are up on the community GitHub.",
    tags: ["Talks", "Demos"],
    color: "gred",
  },
  {
    slug: "cp-contest-3",
    title: "Weekly CP Contest #3",
    type: "Contest",
    domain: "Competitive Programming",
    start: "2026-10-24T18:00:00+05:30",
    end: "2026-10-24T20:00:00+05:30",
    mode: "Online",
    venue: "Online",
    summary: "Six problems, two hours. Editorials posted the next morning.",
    recap: "Problems and editorials are in the club's CP repository.",
    tags: ["CP", "Solo"],
    color: "gyellow",
  },
  {
    slug: "git-and-github-basics",
    title: "Git and GitHub Basics",
    type: "Workshop",
    domain: "Open Source",
    start: "2026-09-19T14:00:00+05:30",
    end: "2026-09-19T16:30:00+05:30",
    mode: "In person",
    venue: "Lab 3, CSE Block",
    summary: "Commits, branches, merge conflicts and your first pull request, for complete beginners.",
    recap: "The practice repository and the cheat sheet from the session stay open for anyone to use.",
    tags: ["Git", "Beginner"],
    color: "gblue",
  },
];

export function isPast(e: GdgEvent, now = new Date()) {
  return new Date(e.end) < now;
}

export function upcomingEvents(now = new Date()) {
  return EVENTS.filter((e) => !isPast(e, now)).sort((a, b) => +new Date(a.start) - +new Date(b.start));
}

export function pastEvents(now = new Date()) {
  return EVENTS.filter((e) => isPast(e, now)).sort((a, b) => +new Date(b.start) - +new Date(a.start));
}

export function getEvent(slug: string) {
  return EVENTS.find((e) => e.slug === slug);
}

const TZ = "Asia/Kolkata";

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: TZ, day: "numeric", month: "short", ...opts }).format(new Date(iso));
}

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: TZ, hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

// Latest recap shown on Home (sample).
export const LATEST_RECAP = {
  eventSlug: "devfest-recap-2026",
  title: "DevFest Campus Edition 2026",
  date: "2026-11-08",
  summary:
    "A full Saturday of student talks and live demos. Slides and code from every session are up on the community GitHub.",
  topics: ["Running models on-device", "Kubernetes on a laptop", "Accessible Android UI", "Firebase auth in 20 minutes"],
};
