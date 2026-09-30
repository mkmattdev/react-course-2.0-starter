import { Link } from "react-router";

export const MNotFound = () => (
  <section className="space-y-4">
    <title>Page not found · Weekendly</title>
    <h1 className="text-3xl font-semibold tracking-tight">Page not found.</h1>
    <Link
      to="/"
      className="text-sm text-accent hover:underline"
    >
      Back to your collection
    </Link>
  </section>
);
