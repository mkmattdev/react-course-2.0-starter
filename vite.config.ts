import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

// json-server answers instantly; slow it down so loading and saving states are visible.
const API_DELAY_MS = 800;
const apiDelay = (): Plugin => ({
  name: "api-delay",
  apply: "serve",
  configureServer: (server) => {
    server.middlewares.use((request, _response, next) => {
      if (request.url?.startsWith("/api/")) setTimeout(next, API_DELAY_MS);
      else next();
    });
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), apiDelay()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@backend": fileURLToPath(new URL("./mock_backend", import.meta.url)),
    },
  },
  server: {
    // The browser calls /api/places; json-server (npm run api) answers on port 3001 at /places.
    proxy: {
      "/api/places": {
        target: "http://127.0.0.1:3001",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/testSetup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    clearMocks: true,
  },
});
