import Link from "next/link";
import { COMMUNITY_LINKS, NAV, SITE } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t-[2.5px] border-line bg-surface">
      {/* Four-colour rule */}
      <div aria-hidden="true" className="grid h-2 grid-cols-4">
        <span className="bg-gblue" />
        <span className="bg-gred" />
        <span className="bg-gyellow" />
        <span className="bg-ggreen" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo size="footer" />
          <p className="max-w-sm text-sm text-muted">
            {SITE.name}, {SITE.location}. A student-run chapter of Google Developer Groups on Campus. This
            community site is not an official Google product.
          </p>
          <ul aria-label="Follow the chapter" className="flex flex-wrap gap-2">
            {COMMUNITY_LINKS.filter((c) => c.href.startsWith("http")).map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-[2.5px] border-line bg-surface px-4 text-sm font-semibold transition-colors duration-150 hover:bg-surface-2"
                >
                  {c.label}
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted">Explore</h2>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted">Credits</h2>
          <p className="text-sm text-muted">
            GDG logo: the official lockup from the chapter&apos;s GDG community page, used unaltered. Type: Space
            Grotesk, Inter and JetBrains Mono (SIL Open Font License, via Google Fonts). Icons drawn inline. Names
            and events are sample content; the Instagram, LinkedIn and community page links are the chapter&apos;s own.
          </p>
        </div>
      </div>
    </footer>
  );
}
