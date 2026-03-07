import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },

  test: {
    environment: "jsdom",
    globals: true,

    deps: {
      inline: [
        "react-native",
        "expo",
        "expo-router",
        "@expo",
        "@react-navigation",
      ],
    },

    coverage: {
      provider: "v8",
    },
  },
});
