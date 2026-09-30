import { getTodayDate, type Place, type PlaceInput } from "@/models/place";

const requestPlaces = async (path: string, options?: RequestInit) => {
  const response = await fetch(`/api/places${path}`, options).catch(() => {
    throw new Error("We could not reach the places API. Please try again.");
  });

  if (response.status === 404) throw new Error("This place no longer exists.");
  if (!response.ok) throw new Error("The places request failed. Please try again.");

  return response.json();
};

const getPlacePath = (placeId: string) => `/${encodeURIComponent(placeId)}`;

// CRUD

// R - Read
// Pobranie miejsc z BFF
export const fetchPlaces = (): Promise<Place[]> => requestPlaces("");

// C - Create
// Utworzenie nowego miejsca i wysłanie go do BFF'a
export const createPlace = (input: PlaceInput): Promise<Place> => {
  const newPlace: Omit<Place, "id"> = {
    ...input,
    isVisited: false,
    addedAt: getTodayDate(),
  };

  return requestPlaces("", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPlace),
  });
};

// U - Update
// Aktualizacja danego miejsca, które już istnieje
export const updatePlace = (place: Place): Promise<Place> =>
  requestPlaces(getPlacePath(place.id), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(place),
  });

// D - Delete
// Usunięcie danego miejsca
export const deletePlace = async (placeId: string) => {
  await requestPlaces(getPlacePath(placeId), { method: "DELETE" });
};
