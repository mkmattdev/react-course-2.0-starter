import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ABadge } from "@/components/atoms/ABadge/ABadge";
import { PLACE_CATEGORY_LABELS, formatPlaceCost, type Place } from "@/models/place";
import { MTable, type TableColumn, type TableSort } from "./MTable";
import { sortItems } from "./sortItems";

const meta = {
  title: "Molecules/MTable",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One generic table, two different data models: every column's render receives the correctly typed item. A column becomes sortable with a sortKey; the table only reports the requested order through onSortChange, and the parent sorts the items with sortItems.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const EXAMPLE_PLACES: Place[] = [
  {
    id: "lake-bled",
    name: "Lake Bled, Slovenia",
    category: "nature",
    description: "An easy lakeside wander with a view worth slowing down for.",
    isVisited: false,
    costPln: 0,
    addedAt: "2026-03-14",
  },
  {
    id: "louisiana-museum",
    name: "Louisiana Museum, Denmark",
    category: "culture",
    description: "Art, architecture and a little time by the water.",
    isVisited: true,
    costPln: 110,
    addedAt: "2026-06-11",
  },
];

const PLACE_COLUMNS: TableColumn<Place>[] = [
  { id: "name", header: "Place", render: (place) => place.name },
  {
    id: "category",
    header: "Category",
    render: (place) => <ABadge>{PLACE_CATEGORY_LABELS[place.category]}</ABadge>,
  },
  {
    id: "cost",
    header: "Cost",
    align: "end",
    render: (place) => formatPlaceCost(place.costPln),
  },
  { id: "visited", header: "Visited", render: (place) => (place.isVisited ? "Yes" : "No") },
];

const getPlaceKey = (place: Place) => place.id;

const PlacesTableExample = () => (
  <MTable
    items={EXAMPLE_PLACES}
    columns={PLACE_COLUMNS}
    getItemKey={getPlaceKey}
  />
);

const EmptyTableExample = () => (
  <MTable
    items={[]}
    columns={PLACE_COLUMNS}
    getItemKey={getPlaceKey}
    emptyState="No places saved yet."
  />
);

type Book = {
  isbn: string;
  title: string;
  pages: number;
  isAvailable: boolean;
};

const BOOKS: Book[] = [
  { isbn: "book-001", title: "The Little Prince", pages: 96, isAvailable: true },
  { isbn: "book-002", title: "The Secret Garden", pages: 288, isAvailable: false },
  { isbn: "book-003", title: "Anne of Green Gables", pages: 320, isAvailable: true },
];

const BOOK_COLUMNS: TableColumn<Book>[] = [
  { id: "title", header: "Book", sortKey: "title", render: (book) => book.title },
  { id: "pages", header: "Pages", sortKey: "pages", align: "end", render: (book) => book.pages },
  {
    id: "availability",
    header: "Availability",
    render: (book) => <ABadge>{book.isAvailable ? "Available" : "On loan"}</ABadge>,
  },
];

const getBookKey = (book: Book) => book.isbn;

const BooksTableExample = () => (
  <MTable
    items={BOOKS}
    columns={BOOK_COLUMNS}
    getItemKey={getBookKey}
  />
);

const SortableBooksTableExample = () => {
  const [sort, setSort] = useState<TableSort<Book>>({ key: "title", direction: "ascending" });

  return (
    <MTable
      items={sortItems(BOOKS, sort)}
      columns={BOOK_COLUMNS}
      getItemKey={getBookKey}
      sort={sort}
      onSortChange={setSort}
    />
  );
};

export const Places: Story = { render: PlacesTableExample };
export const Empty: Story = { render: EmptyTableExample };
export const DifferentDataModel: Story = { render: BooksTableExample };
export const Sortable: Story = { render: SortableBooksTableExample };
