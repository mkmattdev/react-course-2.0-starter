import type { Meta, StoryObj } from "@storybook/react-vite";
import { ASpinner } from "./ASpinner";

const meta = {
  title: "Atoms/ASpinner",
  component: ASpinner,
} satisfies Meta<typeof ASpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
