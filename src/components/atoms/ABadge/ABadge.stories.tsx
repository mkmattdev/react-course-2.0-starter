import type { Meta, StoryObj } from "@storybook/react-vite";
import { ABadge } from "./ABadge";

const meta = {
  title: "Atoms/ABadge",
  component: ABadge,
  args: { children: "Nature" },
  argTypes: {
    tone: { control: "select", options: ["neutral", "green", "violet", "orange", "blue"] },
  },
} satisfies Meta<typeof ABadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { children: "Want to go" } };
export const Green: Story = { args: { tone: "green" } };
export const Violet: Story = { args: { tone: "violet", children: "Culture" } };
export const Orange: Story = { args: { tone: "orange", children: "Food & drink" } };
export const Blue: Story = { args: { tone: "blue", children: "City walks" } };
