import type { Meta, StoryObj } from "@storybook/react-vite";
import { ATextarea } from "./ATextarea";

const meta = {
  title: "Atoms/ATextarea",
  component: ATextarea,
  args: { placeholder: "What makes this place worth the trip?" },
} satisfies Meta<typeof ATextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = {
  args: { defaultValue: "A slow morning walk, then coffee by the water." },
};
export const Invalid: Story = { args: { "aria-invalid": true } };
export const Disabled: Story = { args: { disabled: true } };
