import { Link } from "react-router";
import { ABadge } from "@/components/atoms/ABadge/ABadge";
import { MLoadingState } from "@/components/molecules/MLoadingState/MLoadingState";
import { usePlace } from "@/hooks/usePlace";
import { PLACE_CATEGORY_LABELS, formatPlaceCost, formatPlaceDate } from "@/models/place";

type PlaceDetailsProps = { placeId: string };

export const OPlaceDetails = ({ placeId }: PlaceDetailsProps) => {
  const { place, loadError } = usePlace(placeId);

  if (loadError) {
    return (
      <div className="space-y-4">
        <title>Place could not be loaded · Weekendly</title>
        <h1 className="text-3xl font-semibold tracking-tight">This place could not be loaded.</h1>
        <p className="text-danger">{loadError}</p>
        <Link
          className="text-sm text-accent hover:underline"
          to="/"
        >
          Back to your collection
        </Link>
      </div>
    );
  }

  if (!place) return <MLoadingState message="Loading this place." />;

  return (
    <div className="grid gap-4">
      <title>{`${place.name} · Weekendly`}</title>
      <Link
        className="text-sm text-accent hover:underline"
        to="/"
      >
        Back to your collection
      </Link>
      <article
        className={[
          "rounded-xl border border-line/40 bg-surface",
          "grid justify-items-start gap-4 p-6",
        ].join(" ")}
      >
        <h1 className="text-3xl font-semibold tracking-tight">{place.name}</h1>
        <ABadge tone={place.isVisited ? "green" : "neutral"}>
          {place.isVisited ? "Visited" : "Want to go"}
        </ABadge>
        <p className="text-muted">{place.description || "No description yet."}</p>
        <div className="space-y-1 text-sm">
          <p>
            <span className="text-muted">Category:</span> {PLACE_CATEGORY_LABELS[place.category]}
          </p>
          <p>
            <span className="text-muted">Cost per person:</span> {formatPlaceCost(place.costPln)}
          </p>
          <p>
            <span className="text-muted">Added:</span> {formatPlaceDate(place.addedAt)}
          </p>
        </div>
      </article>
    </div>
  );
};
