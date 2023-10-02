import { defineConfig } from 'vitepress'
import { search } from './configs/search'
import { nav } from './configs/nav'
import { locales } from './configs/locales'
import { description } from "../package.json"
import { footer } from './configs/footer'
import { editLink } from './configs/editLink'
import { head } from "./configs/head"
import { rewrites } from './configs/rewrites'
import { socialLinks } from './configs/socialLinks'

export default defineConfig({
  title: "useBitable",
  description,
  srcDir: "src",
  locales,
  head,
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav,
    logo: "/favicon.svg",
    socialLinks,
    search,
    footer,
    editLink,
    externalLinkIcon: true
  },
  rewrites: rewrites()
})
