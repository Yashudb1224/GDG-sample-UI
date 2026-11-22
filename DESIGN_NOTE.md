# Design note: GDG RVCE website

## Style: bento + neo-brutalism

Every page is a grid of tiles of different sizes, and each tile holds one idea: the next event, a focus area, a person. The tiles are drawn in a neo-brutal way, with thick ink outlines, hard offset shadows and flat colour.

**Why it suits GDG RVCE:**
- **It feels like a developer's tool.** Outlines, monospace labels and a code-editor tile read as "made by people who build things" without turning the site into a terminal joke.
- **It scales.** A tile is one reusable component, so About, Resources or FAQ can be built later from the same parts. On a phone the tiles simply stack.
- **It gives the four Google colours a job.** Each colour fills whole tiles instead of decorating them, so the site reads as GDG at a glance.

## Colour

- The four Google colours are fixed in both themes: blue `#4285F4`, red `#EA4335`, yellow `#FBBC04` and green `#34A853`. Each one has a role:
  - blue: primary actions, Events
  - red: the active page, Tech
  - yellow: "next up", the join prompts
  - green: recaps and operations
- **Text on any Google colour is always near-black ink (`#111`).** Its contrast is at least 4.8:1 on all four colours, which passes WCAG AA. White text would fail on yellow and green, so it isn't used on them.
- **Light theme:** warm paper background (`#FAF7F0`), white cards, ink outlines.
- **Dark theme:** charcoal background (`#111215`), slightly lighter cards, and off-white outlines and shadows so the neo-brutal edges stay visible.
- Both themes come from the same CSS variables and are checked for readable contrast. Muted body text sits well above 4.5:1.

## Type

| Role | Typeface | Why |
| --- | --- | --- |
| Headings | Space Grotesk 700 | Geometric and slightly quirky; matches the hard-edged tiles |
| Body | Inter | Highly readable at small sizes on phones |
| Labels, dates, code | JetBrains Mono | A developer touch for metadata, used sparingly |

All three are open source (SIL OFL) and loaded through `next/font`, so there is no layout shift.

## Signature details

- **Event pages are tickets:** a coloured main panel and a tear-off stub with a dashed perforation and punched notches. The stub holds what you need to attend: date, time, venue, "Register" and "Add to calendar".
- **Team members are ID badges** with a lanyard slot and a generated geometric avatar, which avoids photos of real people.
- **Two optional touches from the brief:** a live event countdown and light/dark themes.
- **Motion stays quiet:**
  - the hero enters once on load
  - cards lift on hover and sink into their shadow when pressed
  - transitions are 200 ms or shorter
  - nothing animates on scroll, and everything respects reduced motion

## How the GDG brand guidelines were followed

- **Colour:** built around the four Google colours, used consistently, with readable text on every one.
- **Logo:** a plain placeholder, as the brief instructs, kept in one component so the official logo can replace it unaltered and with clear space.
- **Name:** "GDG on Campus RV College of Engineering", as listed on the chapter's GDG community page. It is set in one place in the code.
- **Spirit:** friendly, developer-focused copy. The footer states that this is a community site and not an official Google product.
- **Third-party material:** no other companies' logos. Social platforms appear as text labels only. Fonts are credited and every illustration is original SVG.
- **Ground rules:** sample content only, no backend, and no analytics, RSVP or interest counters, attendee lists, comments or chat.
