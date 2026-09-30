import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "green" | "violet" | "orange" | "blue";

type BadgeProps = {
  tone?: BadgeTone;
  children: ReactNode;
};

const BADGE_TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-surface-muted",
  green: "bg-green-subtle text-green",
  violet: "bg-violet-subtle text-violet",
  orange: "bg-orange-subtle text-orange",
  blue: "bg-accent-subtle text-accent",
};

export const ABadge = ({ tone = "neutral", children }: BadgeProps) => (
  <span
    className={[
      "inline-block rounded-full px-2.5 py-0.5 text-xs leading-5 font-medium whitespace-nowrap",
      BADGE_TONE_CLASSES[tone],
    ].join(" ")}
  >
    {children}
  </span>
);
