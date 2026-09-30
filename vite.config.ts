import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "three-core": ["three", "three-stdlib"],
          "gsap-vendor": ["gsap"],
          "physics-vendor": ["@react-three/rapier"],
        },
      },
    },
  },
});
