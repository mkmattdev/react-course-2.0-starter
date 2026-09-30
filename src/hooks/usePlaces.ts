import { useEffect, useState } from "react";
import { createPlace, deletePlace, fetchPlaces, updatePlace } from "@/api/places";
import type { Place, PlaceInput } from "@/models/place";

type PlacesStatus = "loading" | "ready" | "error";

export const usePlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [status, setStatus] = useState<PlacesStatus>("loading");
  const [loadError, setLoadError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [saveError, setSaveError] = useState("");

  // useEffect - wbudowany hook w Reacta
  // wykonuje się PO RENDERZE komponentu
  // jako drugi argument do useEffect przekazujemy tablicę zależności
  // Jeżeli jakakolwiek zmienna stanowa zapisana w tablicy ulegnie zmianie - useEffect wykonuje się ponownie
  // Jeżeli jako drugim argument damy pustą tablicę - to useEffect wykonuje się TYLKO RAZ, po renderze danego komponentu
  useEffect(() => {
    const showPlaces = (loadedPlaces: Place[]) => {
      setPlaces(loadedPlaces);
      setStatus("ready");
    };

    const showError = (requestError: unknown) => {
      setLoadError(
        requestError instanceof Error ? requestError.message : "We could not load your collection."
      );
      setStatus("error");
    };

    fetchPlaces().then(showPlaces).catch(showError);
  }, []);

  const run = async (action: () => Promise<void>) => {
    if (isPending) return false;

    setIsPending(true);
    setSaveError("");

    try {
      await action();

      return true;
    } catch (actionError) {
      setSaveError(actionError instanceof Error ? actionError.message : "Could not save changes.");

      return false;
    } finally {
      setIsPending(false);
    }
  };

  // Dodawanie nowego miejsca do tych już istniejących - miejsca te siedzą w zmiennej stanowej o nazwie "places"
  const addPlace = (input: PlaceInput) =>
    run(async () => {
      const savedPlace = await createPlace(input);
      setPlaces((currentPlaces) => [...currentPlaces, savedPlace]);
    });

  // Zmiana danego miejsca
  const changePlace = (place: Place) =>
    run(async () => {
      const savedPlace = await updatePlace(place);
      setPlaces((currentPlaces) =>
        currentPlaces.map((currentPlace) =>
          currentPlace.id === savedPlace.id ? savedPlace : currentPlace
        )
      );
    });

  // Usuwanie danego miejsca
  const removePlace = (placeId: string) =>
    run(async () => {
      await deletePlace(placeId);
      setPlaces((currentPlaces) => currentPlaces.filter((place) => place.id !== placeId));
    });

  return { places, status, loadError, addPlace, changePlace, removePlace, isPending, saveError };
};
