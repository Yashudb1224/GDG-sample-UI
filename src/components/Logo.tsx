import Image from "next/image";

/**
 * Official GDG lockup, as published on the chapter's GDG community page.
 * Used exactly as supplied: never recoloured, cropped or stretched (width follows
 * height). The file carries its own white background, so on the dark theme it sits
 * on a white label instead of being recoloured. The padding is the logo's clear space.
 * Chapter details are separate text beside it, not edits to the logo.
 */
export function Logo({ size = "header" }: { size?: "header" | "footer" }) {
  const header = size === "header";
  return (
    <span className={header ? "flex items-center gap-3" : "flex flex-col items-start gap-2"}>
      <span className={`inline-flex shrink-0 rounded-lg bg-white ${header ? "px-2 py-2" : "px-3 py-2.5"}`}>
        <Image
          src="/brand/gdg-lockup-1line-black.svg"
          alt="Google Developer Groups"
          width={3003}
          height={300}
          unoptimized
          priority={header}
          className={header ? "h-[18px] w-auto sm:h-5 xl:h-6" : "h-6 w-auto sm:h-7"}
        />
      </span>
      {header ? (
        <span className="hidden flex-col border-l-[2.5px] border-line pl-3 leading-tight md:flex">
          <span className="text-xs text-muted">on Campus</span>
          <span className="font-display text-base font-bold tracking-tight">RVCE</span>
        </span>
      ) : (
        <span className="font-display text-base font-bold tracking-tight">
          on Campus · RVCE
        </span>
      )}
    </span>
  );
}
