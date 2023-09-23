/** @type {import('tailwindcss').Config} */
const sharedConfig = require("tailwind-config/tailwind.config");

module.exports = {
  ...sharedConfig,
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

// "../../packages/ui/**/**.{js,ts,jsx,tsx,mdx}",
