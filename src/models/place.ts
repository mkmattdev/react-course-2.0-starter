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
