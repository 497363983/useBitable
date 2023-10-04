/// <reference types="vitest" />
import { defineConfig } from "vite"
import path from "path"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    vue(),
    dts({ rollupTypes: true, })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@qww0302/use-bitable": path.resolve(__dirname, "./src/index.ts"),
    },
  },
  test: {
    environment: "jsdom",
    include: ["test/**/*.{test,spec}.?(c|m)[jt]s?(x)", "src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    exclude: ["node_modules", "_*/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    reporters: ["html", "default"],
    outputFile: path.resolve("./public/dist/test/index.html"),
    alias: {
      "@qww0302/use-bitable": path.resolve(__dirname, "./src"),
    },
    coverage: {
      reporter: ["html", "json", "text"],
      provider: "v8",
      enabled: true,
      reportsDirectory: path.resolve("./public/dist/test/coverage"),
    },
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
