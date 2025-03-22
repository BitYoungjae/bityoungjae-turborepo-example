import baseConfig from "@repo/eslint-config/base";
import { defineConfig } from "eslint/config";

/** @type {import("eslint").Linter.Config} */
export default defineConfig([...baseConfig]);
