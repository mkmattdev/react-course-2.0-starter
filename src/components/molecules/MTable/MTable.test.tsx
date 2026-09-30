import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AButton } from "@/components/atoms/AButton/AButton";
import { MTable, type TableColumn, type TableSort } from "./MTable";
import { sortItems } from "./sortItems";

type Book = {
  isbn: string;
  title: string;
  pages: number;
};

const BOOKS: Book[] = [
  { isbn: "book-001", title: "The Little Prince", pages: 96 },
  { isbn: "book-002", title: "The Secret Garden", pages: 288 },
  { isbn: "book-003", title: "Anne of Green Gables", pages: 320 },
];

type Destination = {
  id: string;
  name: string;
  isVisited: boolean;
};

const DESTINATIONS: Destination[] = [
  { id: "bled", name: "Lake Bled", isVisited: false },
  { id: "porto", name: "Porto", isVisited: true },
];

const DESTINATION_COLUMNS: TableColumn<Destination>[] = [
  { id: "name", header: "Destination", render: (destination) => destination.name },
  {
    id: "visited",
    header: "Visited",
    render: (destination) => (destination.isVisited ? "Yes" : "No"),
  },
];

const getDestinationKey = (destination: Destination) => destination.id;
const getBookKey = (book: Book) => book.isbn;

const SORTABLE_BOOK_COLUMNS: TableColumn<Book>[] = [
  { id: "title", header: "Title", sortKey: "title", render: (book) => book.title },
  { id: "pages", header: "Pages", sortKey: "pages", align: "end", render: (book) => book.pages },
  { id: "shelf", header: "Shelf", render: () => "Classics" },
];

const SortableBooksTable = () => {
  const [sort, setSort] = useState<TableSort<Book>>({ key: "title", direction: "ascending" });

  return (
    <MTable
      items={sortItems(BOOKS, sort)}
      columns={SORTABLE_BOOK_COLUMNS}
      getItemKey={getBookKey}
      sort={sort}
      onSortChange={setSort}
    />
  );
};

describe("MTable", () => {
  it("renders typed columns with native headers and an empty state as a row", () => {
    const { rerender } = render(
      <MTable
        items={DESTINATIONS}
        columns={DESTINATION_COLUMNS}
        getItemKey={getDestinationKey}
      />
    );

    const table = screen.getByRole("table");
    expect(within(table).getByRole("columnheader", { name: "Destination" })).toBeVisible();
    expect(within(table).getByRole("row", { name: "Lake Bled No" })).toBeInTheDocument();
    expect(within(table).getByRole("row", { name: "Porto Yes" })).toBeInTheDocument();

    rerender(
      <MTable
        items={[]}
        columns={DESTINATION_COLUMNS}
        getItemKey={getDestinationKey}
        emptyState="No destinations yet."
      />
    );

    expect(within(table).getByRole("columnheader", { name: "Destination" })).toBeVisible();
    expect(within(table).getByRole("cell", { name: "No destinations yet." })).toHaveAttribute(
      "colspan",
      "2"
    );
  });

  it("supports another data shape and gives custom renderers the complete typed item", async () => {
    const user = userEvent.setup();
    const handleBorrow = vi.fn();

    const columns: TableColumn<Book>[] = [
      { id: "title", header: "Title", render: (book) => book.title },
      { id: "pages", header: "Pages", render: (book) => book.pages },
      {
        id: "actions",
        header: "Actions",
        render: (book) => {
          const handleBorrowClick = () => handleBorrow(book.isbn);

          return <AButton onClick={handleBorrowClick}>Borrow {book.title}</AButton>;
        },
      },
    ];

    render(
      <MTable
        items={BOOKS}
        columns={columns}
        getItemKey={getBookKey}
      />
    );

    expect(screen.getByRole("cell", { name: "96" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Borrow The Little Prince" }));
    expect(handleBorrow).toHaveBeenCalledWith("book-001");
  });

  it("sorts through a header button and shows the order with an arrow", async () => {
    const user = userEvent.setup();
    render(<SortableBooksTable />);

    const getColumnHeader = (name: string) =>
      screen.getByRole("columnheader", { name: new RegExp(`^${name}`) });

    const getTitles = () =>
      screen
        .getAllByRole("row")
        .slice(1)
        .map((row) => within(row).getAllByRole("cell")[0]?.textContent);

    expect(getColumnHeader("Title")).toHaveTextContent("Title↑");
    expect(getColumnHeader("Pages")).toHaveTextContent("Pages↕");
    expect(getColumnHeader("Shelf")).toHaveTextContent(/^Shelf$/);
    expect(within(getColumnHeader("Shelf")).queryByRole("button")).not.toBeInTheDocument();
    expect(getTitles()).toEqual(["Anne of Green Gables", "The Little Prince", "The Secret Garden"]);

    await user.click(screen.getByRole("button", { name: /^Pages/ }));

    expect(getColumnHeader("Pages")).toHaveTextContent("Pages↑");
    expect(getColumnHeader("Title")).toHaveTextContent("Title↕");
    expect(getTitles()).toEqual(["The Little Prince", "The Secret Garden", "Anne of Green Gables"]);

    await user.click(screen.getByRole("button", { name: /^Pages/ }));

    expect(getColumnHeader("Pages")).toHaveTextContent("Pages↓");
    expect(getTitles()).toEqual(["Anne of Green Gables", "The Secret Garden", "The Little Prince"]);

    await user.click(screen.getByRole("button", { name: /^Pages/ }));

    expect(getColumnHeader("Pages")).toHaveTextContent("Pages↕");
    expect(getTitles()).toEqual(BOOKS.map((book) => book.title));
  });
});
