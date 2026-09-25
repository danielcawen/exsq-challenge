import { defineConfig } from "cypress";
import fs from "fs";
import dotenv from "dotenv";
import { beforeRunHook, afterRunHook } from "cypress-mochawesome-reporter/lib";

const envFile = process.env.ENV_FILE || ".env.local";

if (!fs.existsSync(envFile)) {
  throw new Error(
    `Env file "${envFile}" not found. Check for typos or create it based on .env.example`
  );
}

dotenv.config({ path: envFile });

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "reports",
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  browser: "chrome",
  e2e: {
    setupNodeEvents(on) {
      on("before:run", async (details) => {
        await beforeRunHook(details);
      });
      on("after:run", async () => {
        await afterRunHook();
      });
      on("task", {
        logA11yViolation({ impact, id, helpUrl, selectors }) {
          const indent = "    ";
          console.log(`\n[a11y] [${impact.toUpperCase()}] ${id}`);
          console.log(`${indent}help : ${helpUrl}`);
          selectors.forEach((sel) => console.log(`${indent}node : ${sel}`));
          return null;
        },
      });
    },
    excludeSpecPattern: [
      "cypress/e2e/responsive/**",
      "cypress/e2e/accessibility/**",
      "cypress/e2e/api/**",
    ],
    scrollBehavior: "center",
    baseUrl: process.env.BASE_URL,
    defaultCommandTimeout: parseInt(process.env.DEFAULT_COMMAND_TIMEOUT) || 4000,
    pageLoadTimeout: parseInt(process.env.PAGE_LOAD_TIMEOUT) || 60000,
    viewportWidth: parseInt(process.env.VIEWPORT_WIDTH) || 1280,
    viewportHeight: parseInt(process.env.VIEWPORT_HEIGHT) || 720,
    video: process.env.VIDEO === "false",
    screenshotOnRunFailure: process.env.SCREENSHOT_ON_RUN_FAILURE !== "false",
    blockHosts: [
      "*.doubleclick.net",
      "*.googlesyndication.com",
      "*.googletagmanager.com",
      "*.googletagservices.com",
      "*.google-analytics.com",
      "*.googleadservices.com",
      "*.adservice.google.com",
      "*.adservice.google.com.*",
    ],
    manageBrowserMemory: process.env.MANAGE_BROWSER_MEMORY !== "false",
    retries: {
      runMode: parseInt(process.env.RETRIES) || 0,
      openMode: 0,
    },
  },
});
