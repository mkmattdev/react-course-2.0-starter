import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import type { TableSort } from "@/components/molecules/MTable/MTable";
import { sortItems } from "@/components/molecules/MTable/sortItems";
import type { Place } from "@/models/place";
import { OPlacesTable } from "./OPlacesTable";

const EXAMPLE_PLACES: Place[] = [
  {
    id: "kyoto",
    name: "Kyoto’s quiet gardens",
    category: "culture",
    description: "Take the slower path through moss gardens and temple courtyards.",
    isVisited: false,
    costPln: 60,
    addedAt: "2026-01-04",
  },
  {
    id: "lake-bled",
    name: "A slow day at Lake Bled",
    category: "nature",
    description: "Trade your usual weekend for lakeside paths and a long lunch.",
    isVisited: true,
    costPln: 0,
    addedAt: "2026-01-30",
  },
  {
    id: "bologna",
    name: "A taste of Bologna",
    category: "food",
    description: "Explore a market and turn lunch into the main event.",
    isVisited: false,
    costPln: 150,
    addedAt: "2026-03-25",
  },
];

const meta = {
  title: "Organisms/OPlacesTable",
  component: OPlacesTable,
  args: {
    places: EXAMPLE_PLACES,
    onToggleVisited: fn(),
    onRemove: fn(),
    onSortChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          "A presentational organism: it knows what a place is and supplies typed columns to the generic MTable molecule, but it owns no data. Category badges, formatted cost and dates, visited checkboxes, route links, and removal callbacks stay outside the generic table. This story owns a local collection and sort order so the controls update immediately.",
      },
    },
  },
} satisfies Meta<typeof OPlacesTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractivePlacesTableExample = (args: ComponentProps<typeof OPlacesTable>) => {
  const [places, setPlaces] = useState(args.places);
  const [sort, setSort] = useState<TableSort<Place>>({ key: "addedAt", direction: "descending" });

  const handleToggleVisited = (selectedPlace: Place) => {
    setPlaces((currentPlaces) =>
      currentPlaces.map((place) =>
        place.id === selectedPlace.id ? { ...place, isVisited: !place.isVisited } : place
      )
    );
    args.onToggleVisited(selectedPlace);
  };

  const handleRemove = (selectedPlace: Place) => {
    setPlaces((currentPlaces) => currentPlaces.filter((place) => place.id !== selectedPlace.id));
    args.onRemove(selectedPlace);
  };

  const handleSortChange = (nextSort: TableSort<Place>) => {
    setSort(nextSort);
    args.onSortChange?.(nextSort);
  };

  return (
    <OPlacesTable
      places={sortItems(places, sort)}
      sort={sort}
      onSortChange={handleSortChange}
      onToggleVisited={handleToggleVisited}
      onRemove={handleRemove}
    />
  );
};

export const Interactive: Story = { render: InteractivePlacesTableExample };
export const AllVisited: Story = {
  args: { places: EXAMPLE_PLACES.map((place) => ({ ...place, isVisited: true })) },
  render: InteractivePlacesTableExample,
};
export const Empty: Story = { args: { places: [] } };
