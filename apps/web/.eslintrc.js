module.exports = {
  extends: ["custom/next"],
  rules: {
    "no-console": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "react/button-has-type": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "@typescript-eslint/no-confusing-void-expression": "off",
  },
};
