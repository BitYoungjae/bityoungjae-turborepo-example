import { defineConfig } from "eslint/config";
import baseConfig from "./base.mjs";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  ...baseConfig,
  prettierConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
  },
]);
