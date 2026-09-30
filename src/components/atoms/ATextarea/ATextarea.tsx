import type { ComponentPropsWithRef } from "react";

export const ATextarea = ({
  className = "",
  rows = 3,
  ...textareaProps
}: ComponentPropsWithRef<"textarea">) => (
  <textarea
    {...textareaProps}
    rows={rows}
    className={[
      "w-full rounded-control border border-line bg-surface px-3 py-2",
      "placeholder:text-muted",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-invalid:border-danger",
      className,
    ].join(" ")}
  />
);
