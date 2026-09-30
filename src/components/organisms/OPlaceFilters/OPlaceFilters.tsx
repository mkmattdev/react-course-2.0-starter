import type { ChangeEvent } from "react";
import { AInput } from "@/components/atoms/AInput/AInput";
import { ASelect } from "@/components/atoms/ASelect/ASelect";
import { MToggleGroup } from "@/components/molecules/MToggleGroup/MToggleGroup";
import { PLACE_CATEGORY_OPTIONS, isPlaceCategory } from "@/models/place";
import type { PlaceCategory, VisitFilter } from "@/models/place";

type PlaceFiltersProps = {
  search: string;
  category: PlaceCategory | "all";
  visitFilter: VisitFilter;
  counts: Record<VisitFilter, number>;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: PlaceCategory | "all") => void;
  onVisitFilterChange: (visitFilter: VisitFilter) => void;
};

const CATEGORY_OPTIONS = [
  { value: "all", label: "All categories" },
  ...PLACE_CATEGORY_OPTIONS, // z tego do CATEGORY_OPTIONS dochodzą cztery obiekty, odpowiednio dla każdej kategorii ("nature" | "culture" | "food" | "city")
];

const VISIT_OPTIONS: { value: VisitFilter; label: string }[] = [
  { value: "all", label: "All places" },
  { value: "planned", label: "Want to go" },
  { value: "visited", label: "Visited" },
];

export const OPlaceFilters = ({
  search,
  category,
  visitFilter,
  counts,
  onSearchChange,
  onCategoryChange,
  onVisitFilterChange,
}: PlaceFiltersProps) => {
  // Budujemy tablicę opcji visit dla MToggleGroup
  const visitOptions = VISIT_OPTIONS.map((option) => ({
    ...option,
    itemCount: counts[option.value],
  }));

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;

    if (selectedCategory === "all" || isPlaceCategory(selectedCategory)) {
      onCategoryChange(selectedCategory);
    }
  };

  return (
    <div className="space-y-4">
      <MToggleGroup
        options={visitOptions}
        value={visitFilter}
        onChange={onVisitFilterChange}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AInput
          type="search"
          aria-label="Search places"
          placeholder="Search places…"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <ASelect
          aria-label="Filter by category"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={handleCategoryChange}
        />
      </div>
    </div>
  );
};
