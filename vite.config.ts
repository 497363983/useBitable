/// <reference types="vitest" />
import { defineConfig } from "vite"
import path from "path"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [vue(), dts({ rollupTypes: true, })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    include: ["test/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "useBitable",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "@lark-base-open/js-sdk", "element-plus"],
      output: {
        globals: {
          vue: "Vue",
          "@lark-base-open/js-sdk": "bitable",
          "element-plus": "ElementPlus",
        },
      },
    },
  }
})
