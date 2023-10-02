import { defineConfig } from 'vitepress'
import { search } from './configs/search'
import { nav } from './configs/nav'
import { locales } from './configs/locales'
import { description } from "../package.json"
import { footer } from './configs/footer'
import { editLink } from './configs/editLink'
import { head } from "./configs/head"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "useBitable",
  description,
  srcDir: "src",
  locales,
  head,
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    logo: "/favicon.svg",
    socialLinks: [
      { icon: 'github', link: 'https://github.com/497363983/useBitable' }
    ],
    search,
    footer,
    editLink,
    externalLinkIcon: true
  }
})
