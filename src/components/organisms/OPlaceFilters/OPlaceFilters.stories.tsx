import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import type { PlaceCategory, VisitFilter } from "@/models/place";
import { OPlaceFilters } from "./OPlaceFilters";

const meta = {
  title: "Organisms/OPlaceFilters",
  component: OPlaceFilters,
  args: {
    search: "",
    category: "all",
    visitFilter: "all",
    counts: { all: 12, planned: 8, visited: 4 },
    onSearchChange: fn(),
    onCategoryChange: fn(),
    onVisitFilterChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          "A controlled composition: the parent owns search, category, and visit status. Pressed buttons show the active status filter.",
      },
    },
  },
} satisfies Meta<typeof OPlaceFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledFiltersExample = (args: ComponentProps<typeof OPlaceFilters>) => {
  const [search, setSearch] = useState(args.search);
  const [category, setCategory] = useState<PlaceCategory | "all">(args.category);
  const [visitFilter, setVisitFilter] = useState<VisitFilter>(args.visitFilter);

  const handleSearchChange = (nextSearch: string) => {
    setSearch(nextSearch);
    args.onSearchChange(nextSearch);
  };

  const handleCategoryChange = (nextCategory: PlaceCategory | "all") => {
    setCategory(nextCategory);
    args.onCategoryChange(nextCategory);
  };

  const handleVisitFilterChange = (nextVisitFilter: VisitFilter) => {
    setVisitFilter(nextVisitFilter);
    args.onVisitFilterChange(nextVisitFilter);
  };

  return (
    <div className="space-y-4">
      <OPlaceFilters
        {...args}
        search={search}
        category={category}
        visitFilter={visitFilter}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onVisitFilterChange={handleVisitFilterChange}
      />
      <p className="text-muted">
        Search: {search || "Any place"} · Category: {category} · Status: {visitFilter}
      </p>
    </div>
  );
};

export const Interactive: Story = { render: ControlledFiltersExample };
export const ActiveFilters: Story = {
  args: { search: "garden", category: "nature", visitFilter: "planned" },
  render: ControlledFiltersExample,
};
export const EmptyCollection: Story = {
  args: { counts: { all: 0, planned: 0, visited: 0 } },
  render: ControlledFiltersExample,
};
