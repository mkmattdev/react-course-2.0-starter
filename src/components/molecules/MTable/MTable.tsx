import type { ReactNode } from "react";
import { AButton } from "@/components/atoms/AButton/AButton";

export type SortDirection = "ascending" | "descending" | "none";

export type TableSort<Item> = { key: keyof Item; direction: SortDirection };

type ColumnAlign = "start" | "end";

export type TableColumn<Item> = {
  id: string;
  header: string;
  render: (item: Item) => ReactNode;
  sortKey?: keyof Item;
  align?: ColumnAlign;
  width?: string;
};

type TableProps<Item> = {
  columns: TableColumn<Item>[]; // tablica kolumn do wyświetlenia w tabeli
  items: Item[]; // tablica elementów do wyświetlenia w tabeli (1 item = 1 wiersz w tabeli)
  getItemKey: (item: Item) => string; // zwracamy klucz dla danego elementu (Item) z tabeli
  emptyState?: ReactNode; // stan (dowolny JSX), gdy nie ma elementów (wierszy) do wyświetlenia w tabeli
  sort?: TableSort<Item>; // sortowanie
  onSortChange?: (sort: TableSort<Item>) => void; // funkcja, którą uruchamiamy, gdy klikamy w ikonkę sortowania
};

const ALIGN_CLASS_NAMES: Record<ColumnAlign, string> = {
  start: "text-start",
  end: "text-end",
};

const SORT_INDICATORS: Record<SortDirection, string> = {
  ascending: "↑",
  descending: "↓",
  none: "↕",
};

const NEXT_SORT_DIRECTION: Record<SortDirection, SortDirection> = {
  none: "ascending",
  ascending: "descending",
  descending: "none",
};

export const MTable = <Item extends object>({
  columns,
  items,
  getItemKey,
  emptyState = "There are no items to show.",
  sort,
  onSortChange,
}: TableProps<Item>) => {
  // Funkcja, która sprawdza (dla każdej kolumny oddzielnie), jaki jest jej stan sortowania
  // Jeżeli dana kolumna nie ma przekazanego "sort" -> to zwracamy none
  const getSortState = (sortKey: keyof Item) => (sort?.key === sortKey ? sort.direction : "none");

  // Funkcja, która uruchamia się, gdy klikamy w daną kolumnę w tabeli na ikonkę sortowania
  const handleSortClick = (sortKey: keyof Item) => {
    onSortChange?.({ key: sortKey, direction: NEXT_SORT_DIRECTION[getSortState(sortKey)] });
  };

  const renderHeader = ({
    id,
    header,
    sortKey,
    align = "start",
    width = "",
  }: TableColumn<Item>) => {
    const isSortable = sortKey !== undefined && onSortChange !== undefined;
    const isSorted = isSortable && getSortState(sortKey) !== "none";

    return (
      <th
        key={id}
        className={[
          "border-b border-line/40 px-3 py-3",
          "text-xs font-medium tracking-wide whitespace-nowrap uppercase",
          isSorted ? "text-ink" : "text-muted",
          ALIGN_CLASS_NAMES[align],
          width,
        ].join(" ")}
      >
        {isSortable ? (
          <AButton
            variant="plain"
            className="uppercase"
            onClick={() => handleSortClick(sortKey)}
          >
            {header}
            <span>{SORT_INDICATORS[getSortState(sortKey)]}</span>
          </AButton>
        ) : (
          header
        )}
      </th>
    );
  };

  return (
    <div className={["rounded-xl border border-line/40 bg-surface", "overflow-x-auto"].join(" ")}>
      <table className="w-full min-w-190 table-fixed text-sm">
        <thead>
          <tr>{columns.map(renderHeader)}</tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={getItemKey(item)}
              className="border-b border-line/40 last:border-b-0 hover:bg-surface-muted"
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className={["px-3 py-3", ALIGN_CLASS_NAMES[column.align ?? "start"]].join(" ")}
                >
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-6 text-muted"
              >
                {emptyState}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
