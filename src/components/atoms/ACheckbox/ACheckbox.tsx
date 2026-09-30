import type { ComponentPropsWithRef } from "react";

type CheckboxProps = Omit<ComponentPropsWithRef<"input">, "type">;

export const ACheckbox = ({ className = "", ...checkboxProps }: CheckboxProps) => (
  <input
    {...checkboxProps}
    type="checkbox"
    className={[
      "size-5 accent-accent",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    ].join(" ")}
  />
);
