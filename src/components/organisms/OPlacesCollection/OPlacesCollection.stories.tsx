import type { Meta, StoryObj } from "@storybook/react-vite";
import { OPlacesCollection } from "./OPlacesCollection";

const meta = {
  title: "Organisms/OPlacesCollection",
  component: OPlacesCollection,
  parameters: {
    docs: {
      description: {
        component:
          "The connected organism: usePlaces loads the collection, and every change waits for the API before the list updates. Storybook swaps the API client for a local module that answers with the seed places after a short delay, so the loading state is visible and nothing reaches a server. Filters, sort order, and the page stay local to the organism.",
      },
    },
  },
} satisfies Meta<typeof OPlacesCollection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SeedCollection: Story = {};
