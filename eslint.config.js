import globals from "globals"
import js from "@eslint/js"
import typescriptParser from "@typescript-eslint/parser"
import markdown from "eslint-plugin-markdown"
import vue from "eslint-plugin-vue"
import typescript from "@typescript-eslint/eslint-plugin"

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      }
    },
    // "extends": [
    //   "eslint:recommended",
    //   "plugin:@typescript-eslint/recommended",
    //   "plugin:markdown/recommended",
    //   "plugin:vue/vue3-recommended"
    // ],

    // "parser": "vue-eslint-parser",
    // "parserOptions": {
    //   "ecmaVersion": "latest",
    //   "sourceType": "module",
    //   "parser": "@typescript-eslint/parser"
    // },
    // "plugins": [
    //   "@typescript-eslint",
    //   "markdown"
    // ],
    plugins: {
      markdown,
      vue,
      typescript
    },
    "rules": {
      "indent": [
        "error",
        2
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "error",
        "double"
      ],
      "semi": [
        "error",
        "never"
      ],
      "vue/multi-word-component-names": [
        "error",
        {
          "ignores": [
            "demo"
          ]
        }
      ]
    },
    // "overrides": [

    // ],
    ignores: [
      "dist",
      "node_modules",
      "**/__snapshots__/**",
      "public/test",
      "*.d.ts",
      "_*",
      "_*/**/*"
    ]
  },
  {
    files: [
      "*.md",
      "**/*.md"
    ],
    processor: markdown.processors.markdown,
  }
]