import { ASpinner } from "@/components/atoms/ASpinner/ASpinner";

type LoadingStateProps = { message: string };

export const MLoadingState = ({ message }: LoadingStateProps) => (
  <div className="flex items-center gap-3 py-4">
    <ASpinner />
    <p className="text-muted">{message}</p>
  </div>
);
