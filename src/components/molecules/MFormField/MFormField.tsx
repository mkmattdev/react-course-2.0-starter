import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export const MFormField = ({ label, error, children }: FormFieldProps) => (
  <div className="space-y-2">
    <label className="block space-y-2">
      <span className="block text-sm font-medium">{label}</span>
      {children}
    </label>
    {error && <p className="text-sm text-danger">{error}</p>}
  </div>
);
