import type { Meta, StoryObj } from "@storybook/react-vite";
import { AInput } from "@/components/atoms/AInput/AInput";
import { MFormField } from "./MFormField";

const meta = {
  title: "Molecules/MFormField",
  component: MFormField,
  parameters: { layout: "padded" },
  args: {
    label: "Place name",
    children: <AInput placeholder="For example, Lake Bled, Slovenia" />,
  },
} satisfies Meta<typeof MFormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = {
  args: {
    error: "Use at least 2 characters.",
    children: (
      <AInput
        aria-invalid
        defaultValue="A"
      />
    ),
  },
};
