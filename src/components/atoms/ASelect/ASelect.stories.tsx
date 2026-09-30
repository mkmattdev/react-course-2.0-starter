import { useState, type ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PLACE_CATEGORY_OPTIONS } from "@/models/place";
import { ASelect } from "./ASelect";

const meta = {
  title: "Atoms/ASelect",
  component: ASelect,
  args: { options: PLACE_CATEGORY_OPTIONS },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ASelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledSelectExample = () => {
  const [selectedCategory, setSelectedCategory] = useState("nature");

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="space-y-4">
      <ASelect
        options={PLACE_CATEGORY_OPTIONS}
        value={selectedCategory}
        onChange={handleCategoryChange}
      />
      <p className="text-muted">Selected: {selectedCategory}</p>
    </div>
  );
};

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { "aria-invalid": true } };
export const Controlled: Story = { render: ControlledSelectExample };
