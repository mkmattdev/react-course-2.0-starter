import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MToggleGroup } from "./MToggleGroup";

const meta = {
  title: "Molecules/MToggleGroup",
  component: MToggleGroup,
  args: {
    options: [
      { value: "all", label: "All places", itemCount: 5 },
      { value: "planned", label: "Want to go", itemCount: 3 },
      { value: "visited", label: "Visited", itemCount: 2 },
    ],
    value: "all",
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          "A generic group of AButton atoms with one pressed option. Like MTable, it knows nothing about places: the parent passes the options (itemCount is optional) and the value, and reacts to onChange.",
      },
    },
  },
} satisfies Meta<typeof MToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VisitStatus: Story = {};
export const VisitedPressed: Story = { args: { value: "visited" } };
export const WithoutCounts: Story = {
  args: {
    options: [
      { value: "table", label: "Table" },
      { value: "cards", label: "Cards" },
    ],
    value: "table",
  },
};
