import type { GColor } from "@/lib/site";

export type Member = {
  slug: string;
  name: string;
  role: string;
  year: string;
  /** Optional short bio */
  bio?: string;
  color: GColor;
  links: { label: "GitHub" | "LinkedIn" | "Portfolio"; href: string }[];
};

export type TeamGroup = { id: string; title: string; blurb: string; members: Member[] };

// Sample content only. Every name, bio and link here is made up.
export const TEAM: TeamGroup[] = [
  {
    id: "leads",
    title: "Chapter leads",
    blurb: "Set the semester plan and keep the other teams talking to each other.",
    members: [
      {
        slug: "ishaan-kulkarni",
        name: "Ishaan Kulkarni",
        role: "Chapter Lead",
        year: "4th year · CSE",
        bio: "Came to a Git workshop in first year and stayed. Now plans the semester calendar and runs the opening session of every hackathon.",
        color: "gblue",
        links: [
          { label: "GitHub", href: "#" },
          { label: "LinkedIn", href: "#" },
        ],
      },
      {
        slug: "meera-joshi",
        name: "Meera Joshi",
        role: "Co-Lead",
        year: "3rd year · ISE",
        bio: "Handles partnerships with other campus clubs and makes sure every event has mentors who can unblock people.",
        color: "gred",
        links: [
          { label: "GitHub", href: "#" },
          { label: "LinkedIn", href: "#" },
          { label: "Portfolio", href: "#" },
        ],
      },
    ],
  },
  {
    id: "tech",
    title: "Tech leads",
    blurb: "Each one owns a focus area: its study jams, its projects and its mentors.",
    members: [
      {
        slug: "rohan-shetty",
        name: "Rohan Shetty",
        role: "Machine Learning Lead",
        year: "3rd year · AIML",
        bio: "Runs the ML study jam and the paper circle. Currently trying to fit a vision model on a phone.",
        color: "gblue",
        links: [
          { label: "GitHub", href: "#" },
          { label: "LinkedIn", href: "#" },
        ],
      },
      {
        slug: "kavya-menon",
        name: "Kavya Menon",
        role: "Open Source Lead",
        year: "3rd year · CSE",
        bio: "Maintains the club's repositories and reviews most first-time pull requests.",
        color: "gred",
        links: [{ label: "GitHub", href: "#" }],
      },
      {
        slug: "arjun-bhat",
        name: "Arjun Bhat",
        role: "Competitive Programming Lead",
        year: "2nd year · CSE",
        bio: "Sets the weekly contest problems and writes the editorials the morning after.",
        color: "gyellow",
        links: [
          { label: "GitHub", href: "#" },
          { label: "Portfolio", href: "#" },
        ],
      },
      {
        slug: "sneha-iyer",
        name: "Sneha Iyer",
        role: "Research Lead",
        year: "4th year · ECE",
        bio: "Organises the paper circle and helps members turn projects into workshop submissions.",
        color: "ggreen",
        links: [{ label: "LinkedIn", href: "#" }],
      },
      {
        slug: "vikram-gowda",
        name: "Vikram Gowda",
        role: "Web & Cloud Lead",
        year: "3rd year · ISE",
        color: "gblue",
        links: [
          { label: "GitHub", href: "#" },
          { label: "LinkedIn", href: "#" },
        ],
      },
      {
        slug: "tanvi-desai",
        name: "Tanvi Desai",
        role: "App Development Lead",
        year: "2nd year · CSE",
        bio: "Teaches the Flutter workshops and keeps the club's own event app running.",
        color: "ggreen",
        links: [{ label: "GitHub", href: "#" }],
      },
    ],
  },
  {
    id: "ops",
    title: "Operations",
    blurb: "Venues, design, posts and outreach. The reason events happen on time.",
    members: [
      {
        slug: "nikhil-rao",
        name: "Nikhil Rao",
        role: "Events Lead",
        year: "3rd year · ME",
        bio: "Books the rooms, plans the schedules and owns the run sheet on event day.",
        color: "gyellow",
        links: [{ label: "LinkedIn", href: "#" }],
      },
      {
        slug: "diya-kapoor",
        name: "Diya Kapoor",
        role: "Design Lead",
        year: "2nd year · CSE",
        bio: "Designs every poster and slide template, and drew the club's event badges.",
        color: "gred",
        links: [
          { label: "Portfolio", href: "#" },
          { label: "LinkedIn", href: "#" },
        ],
      },
      {
        slug: "aditya-pillai",
        name: "Aditya Pillai",
        role: "Content & Socials",
        year: "2nd year · ECE",
        color: "gblue",
        links: [{ label: "LinkedIn", href: "#" }],
      },
      {
        slug: "riya-banerjee",
        name: "Riya Banerjee",
        role: "Outreach Lead",
        year: "3rd year · BT",
        bio: "Brings in speakers and connects the chapter with other GDG on Campus groups in Bengaluru.",
        color: "ggreen",
        links: [
          { label: "LinkedIn", href: "#" },
          { label: "Portfolio", href: "#" },
        ],
      },
    ],
  },
];
