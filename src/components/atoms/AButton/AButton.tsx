import type { ComponentPropsWithRef } from "react";
import { ASpinner } from "@/components/atoms/ASpinner/ASpinner";

type ButtonVariant = "primary" | "secondary" | "danger" | "plain";

type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
};

const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "border-ink bg-ink px-3.5 text-surface hover:bg-ink/90",
  secondary: "border-line bg-surface px-3.5 text-ink hover:bg-surface-muted",
  danger: "border-transparent text-danger hover:underline",
  plain: "border-transparent hover:text-ink focus-visible:text-ink",
};

export const AButton = ({
  children,
  variant = "primary",
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
  ...buttonProps
}: ButtonProps) => (
  <button
    {...buttonProps}
    type={type}
    disabled={disabled || isLoading}
    className={[
      "inline-flex min-h-11 items-center justify-center gap-2",
      "rounded-control border py-2 font-medium",
      "cursor-pointer",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-pressed:bg-ink aria-pressed:text-surface",
      BUTTON_VARIANT_CLASSES[variant],
      className,
    ].join(" ")}
  >
    {isLoading && <ASpinner />}
    {children}
  </button>
);
