import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["styled-components", { displayName: true }]],
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@src",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "src/hooks"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
      {
        find: "@models",
        replacement: path.resolve(__dirname, "src/models"),
      },
      { find: "@consts", replacement: path.resolve(__dirname, "src/consts") },
    ],
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
