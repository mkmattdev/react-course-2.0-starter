import type { Meta, StoryObj } from "@storybook/react-vite";
import { TAppLayout } from "./TAppLayout";

const meta = {
  title: "Templates/TAppLayout",
  component: TAppLayout,
  args: {
    children: (
      <>
        <h1 className="mb-6 text-3xl font-semibold">Your next weekend starts here.</h1>
        <p className="text-muted">
          The template gives every view the same header, main, and footer pinned to the bottom of
          short pages. Page content belongs here.
        </p>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        component: "The shared application shell: header, main, and footer.",
      },
    },
  },
} satisfies Meta<typeof TAppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPageContent: Story = {};
