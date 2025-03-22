import webConfig from "@repo/eslint-config/web";
import { defineConfig } from "eslint/config";

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
    ...webConfig,
    {
        ignores: ["**/dist/**"],
    },
]);
