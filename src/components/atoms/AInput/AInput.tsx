import type { ComponentPropsWithRef } from "react";

export const AInput = ({ className = "", ...inputProps }: ComponentPropsWithRef<"input">) => (
  <input
    {...inputProps}
    className={[
      "min-h-11 w-full rounded-control border border-line bg-surface px-3 py-2",
      "placeholder:text-muted",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-invalid:border-danger",
      className,
    ].join(" ")}
  />
);
