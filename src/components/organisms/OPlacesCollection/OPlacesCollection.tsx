import { useState } from "react";
import { AButton } from "@/components/atoms/AButton/AButton";
import { MLoadingState } from "@/components/molecules/MLoadingState/MLoadingState";
import { MPagination } from "@/components/molecules/MPagination/MPagination";
import type { TableSort } from "@/components/molecules/MTable/MTable";
import { sortItems } from "@/components/molecules/MTable/sortItems";
import { OPlaceFilters } from "@/components/organisms/OPlaceFilters/OPlaceFilters";
import { OPlacesTable } from "@/components/organisms/OPlacesTable/OPlacesTable";
import { OPlaceForm } from "@/components/organisms/OPlaceForm/OPlaceForm";
import { usePlaces } from "@/hooks/usePlaces";
import type { Place, PlaceCategory, VisitFilter } from "@/models/place";

const PLACES_PER_PAGE = 5;

export const OPlacesCollection = () => {
  const { places, status, loadError, addPlace, changePlace, removePlace, isPending, saveError } =
    usePlaces();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PlaceCategory | "all">("all");
  const [visitFilter, setVisitFilter] = useState<VisitFilter>("all");
  const [sort, setSort] = useState<TableSort<Place>>({ key: "addedAt", direction: "descending" });
  const [page, setPage] = useState(1);

  if (status === "loading") return <MLoadingState message="Loading your saved places." />;

  if (status === "error") {
    return (
      <div className="space-y-2 py-4">
        <h2 className="text-lg font-semibold">Your collection could not be loaded.</h2>
        <p className="text-danger">{loadError}</p>
      </div>
    );
  }

  const visitedCount = places.filter((place) => place.isVisited).length;

  const counts = {
    all: places.length,
    planned: places.length - visitedCount,
    visited: visitedCount,
  };

  const normalizedSearch = search.trim().toLocaleLowerCase();

  const matchesFilters = (place: Place) => {
    const isSearchMatch = `${place.name} ${place.description}`
      .toLocaleLowerCase()
      .includes(normalizedSearch);

    const isCategoryMatch = category === "all" || place.category === category;

    const isStatusMatch =
      visitFilter === "all" || (visitFilter === "visited" ? place.isVisited : !place.isVisited);

    return isSearchMatch && isCategoryMatch && isStatusMatch;
  };

  const filteredPlaces = places.filter(matchesFilters);
  const sortedPlaces = sortItems(filteredPlaces, sort);

  const pageCount = Math.max(1, Math.ceil(sortedPlaces.length / PLACES_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const firstPlaceIndex = (currentPage - 1) * PLACES_PER_PAGE;
  const visiblePlaces = sortedPlaces.slice(firstPlaceIndex, firstPlaceIndex + PLACES_PER_PAGE);

  const handleSearchChange = (nextSearch: string) => {
    setSearch(nextSearch);
    setPage(1);
  };

  const handleCategoryChange = (nextCategory: PlaceCategory | "all") => {
    setCategory(nextCategory);
    setPage(1);
  };

  const handleVisitFilterChange = (nextVisitFilter: VisitFilter) => {
    setVisitFilter(nextVisitFilter);
    setPage(1);
  };

  const handleSortChange = (nextSort: TableSort<Place>) => {
    setSort(nextSort);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
    setVisitFilter("all");
    setPage(1);
  };

  const handleToggleVisited = (place: Place) =>
    changePlace({ ...place, isVisited: !place.isVisited });

  const handleRemove = (place: Place) => removePlace(place.id);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0 space-y-4">
        <OPlaceFilters
          search={search}
          category={category}
          visitFilter={visitFilter}
          counts={counts}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onVisitFilterChange={handleVisitFilterChange}
        />
        <div
          className={[
            "flex flex-col items-start gap-3",
            "sm:flex-row sm:items-center sm:justify-between",
          ].join(" ")}
        >
          <p className="text-sm text-muted">
            {isPending
              ? "Saving changes…"
              : `${filteredPlaces.length} ${filteredPlaces.length === 1 ? "place" : "places"}`}
          </p>
          <MPagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        </div>
        <div className="grid min-h-104">
          <OPlacesTable
            places={visiblePlaces}
            isPending={isPending}
            sort={sort}
            onSortChange={handleSortChange}
            onToggleVisited={handleToggleVisited}
            onRemove={handleRemove}
            emptyState={
              <div className="flex flex-wrap items-center gap-3">
                No matching places.
                <AButton
                  variant="secondary"
                  onClick={handleClearFilters}
                >
                  Clear filters
                </AButton>
              </div>
            }
          />
        </div>
        {saveError && <p className="text-danger">{saveError}</p>}
      </div>
      <OPlaceForm
        isPending={isPending}
        onAdd={addPlace}
      />
    </div>
  );
};
