import Link from "next/link";
import { BG, type GColor } from "@/lib/site";

export function SectionHeading({
  id,
  title,
  color,
  action,
}: {
  id: string;
  title: string;
  color: GColor;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <h2 id={id} className="flex items-center gap-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        <span aria-hidden="true" className={`${BG[color]} inline-block h-5 w-5 shrink-0 rounded-md border-[2.5px] border-line`} />
        {title}
      </h2>
      {action && (
        <Link href={action.href} className="nb-btn bg-surface">
          {action.label}
        </Link>
      )}
    </div>
  );
}
