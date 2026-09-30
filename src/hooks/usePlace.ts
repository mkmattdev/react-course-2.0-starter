import { useEffect, useState } from "react";
import { fetchPlace } from "@/api/places";
import type { Place } from "@/models/place";

export const usePlace = (placeId: string) => {
  const [place, setPlace] = useState<Place>();
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const showError = (requestError: unknown) => {
      setLoadError(
        requestError instanceof Error ? requestError.message : "We could not load this place."
      );
    };

    fetchPlace(placeId).then(setPlace).catch(showError);
  }, [placeId]);

  return { place, loadError };
};
