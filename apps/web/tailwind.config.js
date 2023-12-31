/** @type {import('tailwindcss').Config} */
const sharedConfig = require("tailwind-config/tailwind.config");

module.exports = {
  ...sharedConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
};

// "../../packages/ui/**/**.{js,ts,jsx,tsx,mdx}",
