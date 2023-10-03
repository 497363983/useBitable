import { defineConfig } from 'vitepress'
import { search } from './configs/search'
import { locales } from './configs/locales'
import { description } from "../package.json"
import { footer } from './configs/footer'
import { head } from "./configs/head"
import { rewrites } from './configs/rewrites'
import { socialLinks } from './configs/socialLinks'
import { markdown } from './configs/markdown'

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
})
