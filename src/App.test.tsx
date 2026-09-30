import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { createPlacesHandlers } from "@backend/handlers";
import type { Place } from "@/models/place";
import { mockServer } from "./testSetup";
import { App } from "./App";

const RESPONSE_DELAY_MS = 200;

const TEST_PLACES: Place[] = [
  {
    id: "kyoto-garden",
    name: "Kyoto Garden",
    category: "nature",
    description: "A quiet garden for a slow afternoon walk.",
    isVisited: false,
    costPln: 0,
    addedAt: "2026-03-14",
  },
  {
    id: "porto-market",
    name: "Porto Market",
    category: "food",
    description: "Explore local flavors and take your time browsing.",
    isVisited: true,
    costPln: 120,
    addedAt: "2026-05-02",
  },
];

const renderApp = (initialPath = "/") =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );

const getPlaceRows = () => screen.getAllByRole("row").slice(1);
const getPlaceRow = (name: string) => screen.getByRole("row", { name: new RegExp(name) });

const getColumnHeader = (name: string) =>
  screen.getByRole("columnheader", { name: new RegExp(`^${name}`) });

describe("Weekendly", () => {
  it("adds a place after the API confirms it and shows it again after remounting", async () => {
    mockServer.resetHandlers(...createPlacesHandlers([], RESPONSE_DELAY_MS));
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    const firstVisit = renderApp();

    expect(screen.getByText("Loading your saved places.")).toBeVisible();
    const nameInput = await screen.findByRole("textbox", { name: "Place name" });

    expect(screen.getByRole("cell", { name: /^No matching places/ })).toBeVisible();

    await user.type(nameInput, "Design Museum");
    await user.selectOptions(screen.getByRole("combobox", { name: "Category" }), "culture");
    const costInput = screen.getByRole("spinbutton", { name: "Cost per person (PLN)" });
    await user.clear(costInput);
    await user.type(costInput, "45");
    await user.type(
      screen.getByRole("textbox", { name: "Description (optional)" }),
      "Modern design, one gallery at a time."
    );
    const saveButton = screen.getByRole("button", { name: "Add place" });
    await user.dblClick(saveButton);

    expect(saveButton).toBeDisabled();
    expect(screen.getByText("Saving changes…")).toBeVisible();
    expect(nameInput).toHaveValue("Design Museum");
    expect(screen.queryByRole("cell", { name: "Design Museum" })).not.toBeInTheDocument();

    expect(await screen.findByRole("cell", { name: "Design Museum" })).toBeVisible();
    expect(screen.getByRole("row", { name: /Design Museum/ })).toHaveTextContent("PLN 45");
    expect(nameInput).toHaveValue("");
    expect(costInput).toHaveValue(0);
    firstVisit.unmount();

    renderApp();

    expect(await screen.findByRole("cell", { name: "Design Museum" })).toBeVisible();
    expect(screen.getByRole("row", { name: /Design Museum/ })).toHaveTextContent("PLN 45");
    expect(fetchSpy.mock.calls.map(([, options]) => options?.method ?? "GET")).toEqual([
      "GET",
      "POST",
      "GET",
    ]);
  });

  it("sorts and paginates the seed collection", async () => {
    const user = userEvent.setup();
    renderApp();
    const searchInput = await screen.findByRole("searchbox", { name: "Search places" });

    expect(screen.getByText("12 places")).toBeVisible();
    expect(screen.getByText("Page 1 of 3")).toBeVisible();
    expect(getPlaceRows()).toHaveLength(5);
    expect(getPlaceRows()[0]).toHaveTextContent("Villages of the Alsace wine route");
    expect(getColumnHeader("Added")).toHaveTextContent("Added↓");
    expect(
      screen.getAllByRole("button", { name: /^(Place|Category|Cost|Added)[↑↓↕]$/ })
    ).toHaveLength(4);
    expect(within(getColumnHeader("Been there?")).queryByRole("button")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Page 2 of 3")).toBeVisible();

    await user.click(screen.getByRole("button", { name: /^Cost/ }));
    expect(getColumnHeader("Cost")).toHaveTextContent("Cost↑");
    expect(getColumnHeader("Added")).toHaveTextContent("Added↕");
    expect(screen.getByText("Page 1 of 3")).toBeVisible();
    expect(getPlaceRows()[0]).toHaveTextContent("A morning in the Dolomites");

    await user.click(screen.getByRole("button", { name: /^Cost/ }));
    expect(getColumnHeader("Cost")).toHaveTextContent("Cost↓");
    expect(getPlaceRows()[0]).toHaveTextContent("Villages of the Alsace wine route");

    await user.type(searchInput, "pintxos");
    expect(screen.getByText("1 place")).toBeVisible();
    expect(screen.getByText("Page 1 of 1")).toBeVisible();

    await user.clear(searchInput);
    await user.type(searchInput, "and");
    await user.click(screen.getByRole("button", { name: "Next" }));
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Page 3 of 3")).toBeVisible();
    expect(getPlaceRows()).toHaveLength(1);

    await user.click(
      within(getPlaceRow("A morning in the Dolomites")).getByRole("button", { name: "Remove" })
    );
    await waitFor(() => expect(screen.getByText("Page 2 of 2")).toBeVisible());
    expect(getPlaceRows()).toHaveLength(5);
    expect(screen.getByText("10 places")).toBeVisible();
  });

  it("filters the collection and saves a visit change and a removal through the API", async () => {
    mockServer.resetHandlers(...createPlacesHandlers(TEST_PLACES, RESPONSE_DELAY_MS));
    mockServer.use(
      http.delete("*/api/places/porto-market", () => new HttpResponse(null, { status: 503 }), {
        once: true,
      })
    );
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    renderApp();
    const searchInput = await screen.findByRole("searchbox", { name: "Search places" });

    await user.type(searchInput, "missing place");

    expect(screen.getByRole("cell", { name: /^No matching places/ })).toBeVisible();
    expect(getColumnHeader("Place")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(searchInput).toHaveValue("");
    expect(screen.getByRole("cell", { name: "Kyoto Garden" })).toBeVisible();
    expect(screen.getByRole("cell", { name: "Porto Market" })).toBeVisible();

    await user.type(searchInput, "kyoto");

    expect(screen.getByRole("cell", { name: "Kyoto Garden" })).toBeVisible();
    expect(screen.queryByRole("cell", { name: "Porto Market" })).not.toBeInTheDocument();

    await user.clear(searchInput);
    await user.selectOptions(screen.getByRole("combobox", { name: "Filter by category" }), "food");

    expect(screen.getByRole("cell", { name: "Porto Market" })).toBeVisible();
    expect(screen.queryByRole("cell", { name: "Kyoto Garden" })).not.toBeInTheDocument();

    await user.selectOptions(screen.getByRole("combobox", { name: "Filter by category" }), "all");
    const visitCheckbox = within(getPlaceRow("Kyoto Garden")).getByRole("checkbox");
    await user.dblClick(visitCheckbox);

    expect(visitCheckbox).toBeDisabled();
    expect(visitCheckbox).not.toBeChecked();
    expect(screen.getByText("Saving changes…")).toBeVisible();
    await waitFor(() => expect(visitCheckbox).toBeChecked());

    const removeButton = within(getPlaceRow("Porto Market")).getByRole("button", {
      name: "Remove",
    });

    await user.click(removeButton);

    expect(await screen.findByText("The places request failed. Please try again.")).toBeVisible();
    expect(screen.getByRole("cell", { name: "Porto Market" })).toBeVisible();

    await user.dblClick(removeButton);

    expect(removeButton).toBeDisabled();
    expect(screen.getByText("Saving changes…")).toBeVisible();
    expect(screen.getByRole("cell", { name: "Porto Market" })).toBeVisible();
    await waitFor(() =>
      expect(screen.queryByRole("cell", { name: "Porto Market" })).not.toBeInTheDocument()
    );

    expect(getPlaceRows()).toHaveLength(1);
    expect(within(getPlaceRow("Kyoto Garden")).getByRole("checkbox")).toBeChecked();
    expect(fetchSpy.mock.calls.map(([, options]) => options?.method ?? "GET")).toEqual([
      "GET",
      "PATCH",
      "DELETE",
      "DELETE",
    ]);

    await user.click(screen.getByRole("button", { name: /^Want to go/ }));

    expect(screen.queryByRole("cell", { name: "Kyoto Garden" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^Visited/ }));
    expect(screen.getByRole("cell", { name: "Kyoto Garden" })).toBeVisible();
  });

  it("blocks an invalid name, keeps the form after a failed save, and saves an empty cost as free", async () => {
    mockServer.resetHandlers(...createPlacesHandlers([]));
    mockServer.use(
      http.post("*/api/places", () => new HttpResponse(null, { status: 503 }), { once: true })
    );
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    renderApp();
    const nameInput = await screen.findByRole("textbox", { name: "Place name" });
    const costInput = screen.getByRole("spinbutton", { name: "Cost per person (PLN)" });
    const saveButton = screen.getByRole("button", { name: "Add place" });

    await user.type(nameInput, "x");
    await user.clear(costInput);
    await user.click(saveButton);

    expect(nameInput).toBeInvalid();
    expect(screen.getByText("Use at least 2 characters.")).toBeVisible();
    expect(fetchSpy).not.toHaveBeenCalledWith(
      "/api/places",
      expect.objectContaining({ method: "POST" })
    );

    await user.type(nameInput, "anadu");
    await user.click(saveButton);

    expect(await screen.findByText("The places request failed. Please try again.")).toBeVisible();
    expect(nameInput).toHaveValue("xanadu");
    await user.click(saveButton);

    expect(await screen.findByRole("cell", { name: "xanadu" })).toBeVisible();
    expect(
      screen.queryByText("The places request failed. Please try again.")
    ).not.toBeInTheDocument();
    expect(screen.getByRole("row", { name: /xanadu/ })).toHaveTextContent("Free");
  });

  it("loads a place by its URL and shows an unknown place as missing", async () => {
    mockServer.resetHandlers(...createPlacesHandlers(TEST_PLACES));
    const user = userEvent.setup();
    const firstVisit = renderApp("/places/porto-market");

    expect(screen.getByText("Loading this place.")).toBeVisible();
    const heading = await screen.findByRole("heading", { level: 1, name: "Porto Market" });

    expect(heading).toBeVisible();
    expect(screen.getByText("Visited")).toBeVisible();
    expect(screen.getByText("Explore local flavors and take your time browsing.")).toBeVisible();
    expect(screen.getByText("Food & drink")).toBeVisible();
    expect(screen.getByText("PLN 120")).toBeVisible();
    expect(screen.getByText("2 May 2026")).toBeVisible();

    await user.click(screen.getByRole("link", { name: "Back to your collection" }));

    expect(await screen.findByRole("link", { name: "Porto Market" })).toBeVisible();
    firstVisit.unmount();

    renderApp("/places/no-such-place");

    expect(
      await screen.findByRole("heading", { level: 1, name: "This place could not be loaded." })
    ).toBeVisible();
    expect(screen.getByText("This place no longer exists.")).toBeVisible();
  });
});
