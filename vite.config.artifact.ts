import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { viteSingleFile } from "vite-plugin-singlefile"

// One-off config for publishing the site as a single self-contained HTML file
// (claude.ai Artifact). Fonts and the Three.js chunk are inlined.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist-artifact",
    assetsInlineLimit: 100_000_000,
  },
})
