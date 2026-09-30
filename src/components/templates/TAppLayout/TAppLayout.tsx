import type { ReactNode } from "react";

type AppLayoutProps = { children: ReactNode };

export const TAppLayout = ({ children }: AppLayoutProps) => (
  <div className="flex min-h-dvh flex-col">
    <header className="border-b border-line/40 bg-surface">
      <p className="mx-auto max-w-6xl px-4 py-4 text-xl font-semibold text-accent">Weekendly.</p>
    </header>
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">{children}</main>
    <footer className="border-t border-line/40 bg-surface">
      <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted">
        Weekendly. Plan your next weekend.
      </p>
    </footer>
  </div>
);
