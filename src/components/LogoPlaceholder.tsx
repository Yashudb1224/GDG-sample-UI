import { SITE } from "@/lib/site";

/**
 * Plain placeholder until organizers share the official GDG logo.
 * Swap this for the supplied asset (unaltered, with clear space) when available.
 */
export function LogoPlaceholder() {
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="grid h-10 w-10 place-items-center rounded-lg border-2 border-dashed border-line font-mono text-[10px] font-semibold leading-none text-muted"
      >
        LOGO
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-base font-bold tracking-tight">{SITE.shortName}</span>
        <span className="hidden text-xs text-muted sm:block">GDG on Campus</span>
      </span>
    </span>
  );
}
