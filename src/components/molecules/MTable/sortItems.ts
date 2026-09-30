import type { TableSort } from "./MTable";

const compareValues = (firstValue: unknown, secondValue: unknown) => {
  // Ten if wykonujemy dla dwóch liczb
  if (typeof firstValue === "number" && typeof secondValue === "number") {
    return firstValue - secondValue;
  }

  // To porównanie (wbudowane w JS - localeCompare) w pozostałych przypadkach
  return String(firstValue).localeCompare(String(secondValue));
};

export const sortItems = <Item>(items: Item[], sort: TableSort<Item>): Item[] => {
  // Jeżeli mamy sortowanie ustawione na none - nic nie sortujemy, zwracamy elementy w takiej kolejności, w jakiej przychodzą do naszej funkcji
  if (sort.direction === "none") return items;

  const ascendingItems = items.toSorted((firstItem, secondItem) =>
    compareValues(firstItem[sort.key], secondItem[sort.key])
  );

  // Jeżeli mamy sortowanie ustawione na ascending to zwracamy rezultat z ascendingItems
  // Jeżeli mamy sortowanie ustawione na descending to zwracamy odwrócony rezult z ascendingItems (robimy dodatkowo .toReversed())
  return sort.direction === "ascending" ? ascendingItems : ascendingItems.toReversed();
};
