import type { Meta, StoryObj } from "@storybook/react-vite";
import { OPlaceDetails } from "./OPlaceDetails";

const meta = {
  title: "Organisms/OPlaceDetails",
  component: OPlaceDetails,
  args: { placeId: "lake-bled" },
  parameters: {
    docs: {
      description: {
        component:
          "The organism loads one place by id with usePlace and shows it read-only. Storybook swaps the API client for a local module that answers from the seed places, so an unknown id shows the missing-place message.",
      },
    },
  },
} satisfies Meta<typeof OPlaceDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WantToGo: Story = {};
export const Visited: Story = { args: { placeId: "lisbon" } };
export const MissingPlace: Story = { args: { placeId: "no-such-place" } };
