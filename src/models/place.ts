const PLACE_NAME_MIN_LENGTH = 2;

export type PlaceCategory = "nature" | "culture" | "food" | "city";

export type Place = {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  isVisited: boolean;
  // Entry cost per person in whole złoty; 0 means free.
  costPln: number;
  // Calendar date "YYYY-MM-DD", so it sorts correctly as a plain string.
  addedAt: string;
};

export type PlaceInput = Pick<Place, "name" | "category" | "description" | "costPln">;

export type VisitFilter = "all" | "planned" | "visited";

export const PLACE_CATEGORY_LABELS: Record<PlaceCategory, string> = {
  nature: "Nature",
  culture: "Culture",
  food: "Food & drink",
  city: "City walks",
};

export const PLACE_CATEGORY_OPTIONS = Object.entries(PLACE_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
);

export const isPlaceCategory = (value: string): value is PlaceCategory =>
  Object.hasOwn(PLACE_CATEGORY_LABELS, value);

export const getPlaceNameError = (name: string) =>
  name.length < PLACE_NAME_MIN_LENGTH ? `Use at least ${PLACE_NAME_MIN_LENGTH} characters.` : "";

export const formatPlaceCost = (costPln: number) => (costPln === 0 ? "Free" : `PLN ${costPln}`);

export const formatPlaceDate = (addedAt: string) =>
  new Date(addedAt).toLocaleDateString("en-GB", { dateStyle: "medium", timeZone: "UTC" });

export const getTodayDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${today.getFullYear()}-${month}-${day}`;
};
