import type { ComponentPropsWithRef } from "react";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = Omit<ComponentPropsWithRef<"select">, "children"> & {
  options: SelectOption[];
};

export const ASelect = ({ options, className = "", ...selectProps }: SelectProps) => (
  <span className={["relative", className].join(" ")}>
    <select
      {...selectProps}
      className={[
        "peer min-h-11 w-full appearance-none rounded-control border border-line bg-surface",
        "py-2 pr-10 pl-3",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-danger",
      ].join(" ")}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
    <span
      className={[
        "pointer-events-none absolute top-1/2 right-4 size-2",
        "border-r-2 border-b-2 border-current",
        "-translate-y-3/4 rotate-45 peer-open:-translate-y-1/4 peer-open:rotate-225",
        "transition-transform",
      ].join(" ")}
    />
  </span>
);
