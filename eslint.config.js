import pluginJs from "@eslint/js";
import pluginCypress from "eslint-plugin-cypress/flat";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      ecmaVersion: 2020,
    },
  },
  {
    files: ["cypress/**/*.js"],
    rules: {
      "cypress/no-unnecessary-waiting": "error",
    },
  },
  {
    files: ["cypress.config.js"],
    languageOptions: {
      globals: {
        process: "readonly",
      },
    },
  },
];
