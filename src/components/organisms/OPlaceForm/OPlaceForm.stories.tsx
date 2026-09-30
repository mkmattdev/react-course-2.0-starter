import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PLACE_CATEGORY_LABELS, formatPlaceCost, type PlaceInput } from "@/models/place";
import { OPlaceForm } from "./OPlaceForm";

const meta = {
  title: "Organisms/OPlaceForm",
  component: OPlaceForm,
  args: { onAdd: fn(async () => true) },
  parameters: {
    docs: {
      description: {
        component:
          "The form validates the name and hands a PlaceInput to onAdd, with the cost saved as whole PLN, 0 or more. onAdd resolves to true when the place was saved: only then the fields are cleared. The collection saves through usePlaces and shows a failed save in its shared alert.",
      },
    },
  },
} satisfies Meta<typeof OPlaceForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const SavePlaceExample = (args: ComponentProps<typeof OPlaceForm>) => {
  const [savedPlace, setSavedPlace] = useState<PlaceInput>();

  const handleAdd = async (input: PlaceInput) => {
    const isAdded = await args.onAdd(input);
    if (isAdded) setSavedPlace(input);

    return isAdded;
  };

  return (
    <div className="grid gap-4">
      <OPlaceForm onAdd={handleAdd} />
      {savedPlace && (
        <div className="text-muted">
          <p>
            Saved {savedPlace.name}: {PLACE_CATEGORY_LABELS[savedPlace.category]}
          </p>
          <p>Cost: {formatPlaceCost(savedPlace.costPln)}</p>
          {savedPlace.description && <p>{savedPlace.description}</p>}
        </div>
      )}
    </div>
  );
};

export const Default: Story = {};
export const Saving: Story = { args: { isPending: true } };
export const SavePlace: Story = {
  render: SavePlaceExample,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Place name" }),
      "Lake Bled, Slovenia"
    );
    await userEvent.selectOptions(canvas.getByRole("combobox", { name: "Category" }), "nature");
    const costInput = canvas.getByRole("spinbutton", { name: "Cost per person (PLN)" });
    await userEvent.clear(costInput);
    await userEvent.type(costInput, "80");
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Description (optional)" }),
      "Lakeside paths and a long lunch."
    );
    await userEvent.click(canvas.getByRole("button", { name: "Add place" }));
    await expect(await canvas.findByText(/^Saved Lake Bled, Slovenia/)).toBeVisible();
    await expect(args.onAdd).toHaveBeenCalledWith({
      name: "Lake Bled, Slovenia",
      category: "nature",
      costPln: 80,
      description: "Lakeside paths and a long lunch.",
    });
    await expect(canvas.getByRole("textbox", { name: "Place name" })).toHaveValue("");
  },
};
export const NameValidation: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Add place" }));
    await expect(canvas.getByRole("textbox", { name: "Place name" })).toBeInvalid();
    await expect(canvas.getByText("Use at least 2 characters.")).toBeVisible();
    await expect(args.onAdd).not.toHaveBeenCalled();
  },
};
export const FailedSave: Story = {
  args: { onAdd: fn(async () => false) },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox", { name: "Place name" }), "Porto");
    await userEvent.click(canvas.getByRole("button", { name: "Add place" }));
    await expect(args.onAdd).toHaveBeenCalled();
    await expect(canvas.getByRole("textbox", { name: "Place name" })).toHaveValue("Porto");
  },
};
