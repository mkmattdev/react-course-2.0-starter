import type { ReactNode } from "react";
import { ABadge, type BadgeTone } from "@/components/atoms/ABadge/ABadge";
import { AButton } from "@/components/atoms/AButton/AButton";
import { ACheckbox } from "@/components/atoms/ACheckbox/ACheckbox";
import { MTable, type TableColumn, type TableSort } from "@/components/molecules/MTable/MTable";
import { PLACE_CATEGORY_LABELS, formatPlaceCost, formatPlaceDate } from "@/models/place";
import type { Place, PlaceCategory } from "@/models/place";

type PlacesTableProps = {
  places: Place[];
  isPending?: boolean;
  sort?: TableSort<Place>;
  onSortChange?: (sort: TableSort<Place>) => void;
  onToggleVisited: (place: Place) => void;
  onRemove: (place: Place) => void;
  emptyState?: ReactNode;
};

// Ustalamy klucz dla każdego "wiersza", czyli każdego miejsca w naszej tabelce
const getPlaceKey = (place: Place) => place.id;

// Mapowanie odpowiednich kategorii (z typu PlaceCategory) na istniejący ton koloru w atomie ABadge
const CATEGORY_TONES: Record<PlaceCategory, BadgeTone> = {
  nature: "green",
  culture: "violet",
  food: "orange",
  city: "blue",
};

export const OPlacesTable = ({
  places,
  isPending = false,
  sort,
  onSortChange,
  onToggleVisited,
  onRemove,
  emptyState,
}: PlacesTableProps) => {
  const columns: TableColumn<Place>[] = [
    {
      id: "name",
      header: "Place",
      sortKey: "name",
      render: (place) => <span className="line-clamp-2 font-medium">{place.name}</span>,
    },
    {
      id: "category",
      header: "Category",
      width: "w-32",
      sortKey: "category",
      render: (place) => (
        <ABadge tone={CATEGORY_TONES[place.category]}>
          {PLACE_CATEGORY_LABELS[place.category]}
        </ABadge>
      ),
    },
    {
      id: "cost",
      header: "Cost",
      width: "w-24",
      sortKey: "costPln",
      align: "end",
      render: (place) => (
        <span className="whitespace-nowrap tabular-nums">{formatPlaceCost(place.costPln)}</span>
      ),
    },
    {
      id: "added",
      header: "Added",
      width: "w-30",
      sortKey: "addedAt",
      render: (place) => (
        <time
          dateTime={place.addedAt}
          className="whitespace-nowrap"
        >
          {formatPlaceDate(place.addedAt)}
        </time>
      ),
    },
    {
      id: "status",
      header: "Been there?",
      width: "w-32",
      render: (place) => (
        <label className="flex min-h-11 items-center gap-2">
          <ACheckbox
            checked={place.isVisited}
            disabled={isPending}
            onChange={() => onToggleVisited(place)}
          />
          {place.isVisited ? "Visited" : "Not yet"}
        </label>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      width: "w-24",
      render: (place) => (
        <AButton
          variant="danger"
          disabled={isPending}
          onClick={() => onRemove(place)}
        >
          Remove
        </AButton>
      ),
    },
  ];

  return (
    <MTable
      items={places}
      columns={columns}
      getItemKey={getPlaceKey}
      emptyState={emptyState}
      sort={sort}
      onSortChange={onSortChange}
    />
  );
};
