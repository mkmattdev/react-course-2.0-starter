import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";

const conventionRules = [
  {
    selector: "TSAsExpression",
    message: "Validate or narrow the value instead of asserting a type.",
  },
  { selector: "TSTypeAssertion", message: "Use inference, annotations, or runtime validation." },
  { selector: "TSNonNullExpression", message: "Handle the missing value explicitly." },
];

export default defineConfig(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-var": "error",
      "prefer-const": "error",
      "func-style": ["error", "expression"],
      eqeqeq: ["error", "always"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-deprecated": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        { "ts-ignore": true, "ts-nocheck": true, "ts-expect-error": true },
      ],
      "no-restricted-syntax": ["error", ...conventionRules],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}", "mock_backend/**/*.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...conventionRules,
        { selector: "ExportDefaultDeclaration", message: "Use named exports in product code." },
      ],
    },
  },
  {
    files: ["src/**/*.tsx"],
    ignores: ["**/*.test.tsx"],
    rules: { "react-refresh/only-export-components": "error" },
  },
  prettier
);
