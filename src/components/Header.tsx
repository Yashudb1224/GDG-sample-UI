"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const ACTIVE_COLORS = ["bg-gblue", "bg-gred", "bg-ggreen"];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6">
      {/* Frosted backdrop: blurs and tints whatever scrolls behind the header strip,
          fading out just below the bar so there's no hard edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-bg/35 backdrop-blur-[6px] [-webkit-mask-image:linear-gradient(to_bottom,#000_25%,transparent_95%)] [mask-image:linear-gradient(to_bottom,#000_25%,transparent_95%)]"
      />
      <div className="nb-card mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2 sm:px-4">
        <Link href="/" aria-label={`${SITE.name} home`} className="flex min-h-11 shrink-0 items-center rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item, i) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full border-[2.5px] px-4 py-2 font-semibold transition-colors ${
                      active
                        ? `${ACTIVE_COLORS[i]} border-line text-on-color`
                        : "border-transparent hover:border-line"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={SITE.joinUrl} className="nb-btn hidden bg-gyellow text-on-color sm:inline-flex">
            Join the community
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border-[2.5px] border-line bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="nb-card mx-auto mt-2 max-w-6xl p-2 lg:hidden">
          <ul className="grid gap-1">
            {NAV.map((item, i) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center rounded-xl border-[2.5px] px-4 text-lg font-semibold ${
                      active ? `${ACTIVE_COLORS[i]} border-line text-on-color` : "border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-1">
              <a href={SITE.joinUrl} onClick={() => setOpen(false)} className="nb-btn w-full bg-gyellow text-on-color">
                Join the community
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
