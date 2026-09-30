import { useState, type ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ACheckbox } from "./ACheckbox";

const meta = {
  title: "Atoms/ACheckbox",
  component: ACheckbox,
} satisfies Meta<typeof ACheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledCheckboxExample = () => {
  const [isVisited, setIsVisited] = useState(false);

  const handleVisitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsVisited(event.target.checked);
  };

  return (
    <label className="flex min-h-11 items-center gap-2">
      <ACheckbox
        checked={isVisited}
        onChange={handleVisitChange}
      />
      {isVisited ? "Visited — another memory made" : "Mark this place as visited"}
    </label>
  );
};

export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Controlled: Story = { render: ControlledCheckboxExample };
