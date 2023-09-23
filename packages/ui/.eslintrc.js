module.exports = {
  extends: ["custom/react-internal"],
  rules: {
    "no-console": "off",
    "import/no-extraneous-dependencies": [error, { devDependencies: true }],
  },
  env: {
    node: true,
  },
};
