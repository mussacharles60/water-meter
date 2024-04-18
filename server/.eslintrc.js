module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": "off",
    "camelcase": "off",
    "object-curly-spacing": "off",
    "indent": "off",
    "new-cap": "off",
    "arrow-parens": "off",
    "brace-style": "off",
    "comma-dangle": "off",
    "padded-block": "off",
    "quote-props": "off",
    "spaced-comment": "off",
    "padded-blocks": "off",
    "no-trailing-spaces": "off",
    '@typescript-eslint/no-var-requires': 0,
    "semi": "off",
    "max-len": 0,
    "no-case-declarations": "off",
    "operator-linebreak": "off",
    "linebreak-style": "off",
    "space-before-function-paren": "off",
  },
};
