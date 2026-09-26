import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { createPlacesHandlers } from "@backend/handlers";

export const mockServer = setupServer(...createPlacesHandlers());

beforeAll(() => mockServer.listen({ onUnhandledRequest: "error" }));
beforeEach(() => {
  mockServer.resetHandlers(...createPlacesHandlers());
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => {
  cleanup();
});
afterAll(() => mockServer.close());
