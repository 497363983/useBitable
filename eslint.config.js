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