// Single source for chapter naming, as listed on the chapter's GDG community page.
export const SITE = {
  name: "GDG on Campus RV College of Engineering",
  shortName: "GDG RVCE",
  location: "Bengaluru, India",
  college: "RV College of Engineering, Bengaluru",
  tagline:
    "The student developer community at RVCE: workshops, hackathons, study jams and research across ML, open source and competitive programming.",
  // The chapter's real community page (public, no personal data)
  joinUrl: "https://gdg.community.dev/gdg-on-campus-rv-college-of-engineering-bengaluru-india/",
};

// Focus areas from the chapter's About text
export const DOMAINS = [
  { title: "Machine Learning", body: "Train, evaluate and ship models, from a first classifier to on-device inference.", color: "gblue", glyph: "ML" },
  { title: "Open Source", body: "Contribute to real repositories and maintain the club's own projects.", color: "gred", glyph: "OS" },
  { title: "Competitive Programming", body: "Weekly problem sets, contest practice and editorial walkthroughs.", color: "gyellow", glyph: "CP" },
  { title: "Research", body: "Read papers together, reproduce results and work toward publishing.", color: "ggreen", glyph: "R&D" },
] as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
] as const;

// Community channels. Text labels only: no third-party logos (brand rule).
export const COMMUNITY_LINKS = [
  { label: "GitHub", handle: "@gdg-rvce-sample", href: "#", blurb: "Workshop code, starter repos and open projects.", color: "gblue" },
  { label: "Discord", handle: "gdg-rvce-sample", href: "#", blurb: "Ask doubts, find teammates, share what you built.", color: "ggreen" },
  { label: "Instagram", handle: "@gdgrvce.sample", href: "#", blurb: "Event photos, reels and announcements.", color: "gred" },
  { label: "LinkedIn", handle: "GDG RVCE (sample)", href: "#", blurb: "Recaps, speaker spotlights and opportunities.", color: "gyellow" },
] as const;

export type GColor = "gblue" | "gred" | "gyellow" | "ggreen";

// Static class maps so Tailwind can see every class name.
export const BG: Record<GColor, string> = {
  gblue: "bg-gblue",
  gred: "bg-gred",
  gyellow: "bg-gyellow",
  ggreen: "bg-ggreen",
};
