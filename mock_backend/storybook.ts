import { getTodayDate, type Place, type PlaceInput } from "@/models/place";
import { SEED_PLACES } from "./seed";

const RESPONSE_DELAY_MS = 800;

const respondAfterDelay = <Value>(value: Value) =>
  new Promise<Value>((resolve) => setTimeout(() => resolve(value), RESPONSE_DELAY_MS));

export const fetchPlaces = () => respondAfterDelay(SEED_PLACES);

export const fetchPlace = async (placeId: string) => {
  const place = await respondAfterDelay(SEED_PLACES.find((seedPlace) => seedPlace.id === placeId));
  if (!place) throw new Error("This place no longer exists.");

  return place;
};

export const createPlace = (input: PlaceInput) =>
  respondAfterDelay<Place>({
    ...input,
    id: crypto.randomUUID(),
    isVisited: false,
    addedAt: getTodayDate(),
  });

export const updatePlace = (place: Place) => respondAfterDelay(place);

export const deletePlace = async (placeId: string) => {
  await respondAfterDelay(placeId);
};
