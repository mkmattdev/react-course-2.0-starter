import type { Preview } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import "../src/styles.css";

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="mx-auto max-w-7xl p-4">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    options: {
      storySort: {
        order: ["Atoms", "Molecules", "Organisms", "Templates", "Views"],
      },
    },
  },
};

export default preview;
