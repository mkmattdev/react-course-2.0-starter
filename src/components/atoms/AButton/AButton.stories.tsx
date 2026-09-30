import type { Meta, StoryObj } from "@storybook/react-vite";
import { AButton } from "./AButton";

const meta = {
  title: "Atoms/AButton",
  component: AButton,
  args: { children: "Add a place" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "danger", "plain"] },
  },
} satisfies Meta<typeof AButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary", children: "Cancel" } };
export const Danger: Story = { args: { variant: "danger", children: "Delete place" } };
export const Plain: Story = { args: { variant: "plain", children: "Sort by cost" } };
export const Loading: Story = { args: { isLoading: true, children: "Saving…" } };
export const Disabled: Story = { args: { disabled: true } };
