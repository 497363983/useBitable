import { defineConfig } from 'vitepress'
import { search } from './configs/search'
import { locales } from './configs/locales'
import { description } from "../package.json"
import { footer } from './configs/footer'
import { head } from "./configs/head"
import { rewrites } from './configs/rewrites'
import { socialLinks } from './configs/socialLinks'
import { markdown } from './configs/markdown'
import { mdTransform } from './plugins/mdTransform'
import Inspect from 'vite-plugin-inspect'
import Components from 'unplugin-vue-components/vite'
import {resolve} from "node:path"

export default defineConfig({
  title: "useBitable",
  description,
  srcDir: "src",
  outDir: "public/dist",
  locales,
  head,
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    logo: "/favicon.svg",
    socialLinks,
    search,
    footer,
    externalLinkIcon: true,
    outline: "deep",
  },
  rewrites: rewrites(),
  markdown,
  vite: {
    plugins: [
      mdTransform(),
      Components({
        dirs: resolve(__dirname, "theme/components"),
        extensions: ["vue", "ts"],
        dts: "./components.d.ts",
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        transformer: "vue3"
      }),
      Inspect(),
    ],
    resolve: {
      alias: {
        "@qww0302/use-bitable": resolve(__dirname, "../src"),
        "@": resolve(__dirname, "../src"),
      }
    },
    optimizeDeps: {
      exclude: ["@qww0302/use-bitable"]
    }
  }
})
