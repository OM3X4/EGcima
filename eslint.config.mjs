const eslintConfig = [
  // Include Next.js recommended rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Override rules (including disabling the img warning)
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "off",

      // Add this to ignore unused variables starting with _
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
    },
  },
];

export default eslintConfig;
