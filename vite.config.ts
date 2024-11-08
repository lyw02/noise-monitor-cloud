import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  server: {
    proxy: {
      "/open-data": {
        target: "https://data.smartdublin.ie/sonitus-api/api/data",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/open-data/, ""),
      },
    },
  },
});
