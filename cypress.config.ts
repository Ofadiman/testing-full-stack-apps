import { defineConfig } from "cypress";
import task from "@cypress/code-coverage/task";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: ["cypress/e2e/**/*.{ts,tsx}"],
    setupNodeEvents(on, config) {
      task(on, config);

      return config;
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "src/**/*.test.{ts,tsx}",
    setupNodeEvents(on, config) {
      task(on, config);

      return config;
    },
  },
});
