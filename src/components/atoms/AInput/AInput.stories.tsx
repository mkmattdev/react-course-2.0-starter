import { useState, type ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AInput } from "./AInput";

const meta = {
  title: "Atoms/AInput",
  component: AInput,
  args: { placeholder: "Somewhere you would love to go" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof AInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledInputExample = () => {
  const [placeName, setPlaceName] = useState("Jardim do Morro, Porto");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceName(event.target.value);
  };

  return (
    <div className="space-y-4">
      <AInput
        value={placeName}
        onChange={handleNameChange}
      />
      <p className="text-muted">Current value: {placeName || "Empty"}</p>
    </div>
  );
};

export const Default: Story = {};
export const Invalid: Story = { args: { "aria-invalid": true, defaultValue: "A" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Kyoto, Japan" } };
export const Controlled: Story = { render: ControlledInputExample };
