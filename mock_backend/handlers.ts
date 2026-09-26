import { delay, http, HttpResponse } from "msw";
import type { Place } from "@/models/place";
import { SEED_PLACES } from "./seed";

// Test-only stand-in for json-server: the same five routes and responses, kept in memory.
type NewPlace = Omit<Place, "id">;
type PlaceParams = { placeId: string };

const missingPlace = () => HttpResponse.json({ error: "Not Found" }, { status: 404 });

export const createPlacesHandlers = (initialPlaces = SEED_PLACES, responseDelayMs = 0) => {
  let places = initialPlaces;

  return [
    http.get("*/api/places", async () => {
      await delay(responseDelayMs);
      return HttpResponse.json(places);
    }),
    http.get<PlaceParams>("*/api/places/:placeId", async ({ params }) => {
      await delay(responseDelayMs);
      const place = places.find((storedPlace) => storedPlace.id === params.placeId);
      if (!place) return missingPlace();
      return HttpResponse.json(place);
    }),
    http.post<never, NewPlace>("*/api/places", async ({ request }) => {
      await delay(responseDelayMs);
      const place: Place = { ...(await request.json()), id: crypto.randomUUID() };
      places = [...places, place];
      return HttpResponse.json(place, { status: 201 });
    }),
    http.patch<PlaceParams, Partial<Place>>(
      "*/api/places/:placeId",
      async ({ request, params }) => {
        await delay(responseDelayMs);
        const storedPlace = places.find((place) => place.id === params.placeId);
        if (!storedPlace) return missingPlace();
        const updatedPlace: Place = {
          ...storedPlace,
          ...(await request.json()),
          id: params.placeId,
        };
        places = places.map((place) => (place === storedPlace ? updatedPlace : place));
        return HttpResponse.json(updatedPlace);
      }
    ),
    http.delete<PlaceParams>("*/api/places/:placeId", async ({ params }) => {
      await delay(responseDelayMs);
      const removedPlace = places.find((place) => place.id === params.placeId);
      if (!removedPlace) return missingPlace();
      places = places.filter((place) => place.id !== params.placeId);
      return HttpResponse.json(removedPlace);
    }),
  ];
};
