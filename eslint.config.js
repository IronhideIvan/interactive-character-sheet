import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, stylistic.configs.recommended],
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@stylistic": stylistic,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@stylistic/comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "always-multiline",
          importAttributes: "always-multiline",
          dynamicImports: "always-multiline",
          generics: "always-multiline",
        },
      ],
      "@stylistic/jsx-curly-brace-presence": "off",
      "@stylistic/jsx-one-expression-per-line": ["error", { allow: "non-jsx" }],
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/array-bracket-newline": ["error", { multiline: true }],
      "@stylistic/array-element-newline": ["error", { consistent: true, multiline: true, minItems: 4 }],
      "@stylistic/brace-style": ["error", "stroustrup"],
      "@stylistic/function-paren-newline": ["error", "consistent"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-extra-semi": "error",
      "@stylistic/semi": ["error", "always"],
      "@stylistic/jsx-max-props-per-line": ["error", { maximum: { single: 3, multi: 1 } }],
      "@stylistic/jsx-wrap-multilines": "error",
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/member-delimiter-style": [
        "error",
        {
          multiline: {
            delimiter: "semi",
            requireLast: true,
          },
          singleline: {
            delimiter: "semi",
            requireLast: true,
          },
          multilineDetection: "brackets",
        },
      ],
      // Off because this rule is broken.
      "react-hooks/rules-of-hooks": "off",
    },
  },
);
