import baseConfig from "./base.mjs";

/** @type {import('prettier').Config} */
export default {
  ...baseConfig,
  plugins: ["prettier-plugin-tailwindcss"],
};
