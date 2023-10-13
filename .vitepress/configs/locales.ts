import { UserConfig } from "vitepress"
import { nav } from "./nav"
import { editLink } from "./editLink"
import { sidebar } from "./sideBar"
import { lastUpdated } from "./lastUpdated"
import { docFooter } from "./docFooter"

export const locales: UserConfig["locales"] = {
  root: {
    lang: "en",
    label: "English",
    themeConfig: {
      nav: nav("en"),
      editLink: editLink("en"),
      sidebar: sidebar("en", ["UIBuilder", "introduction", "composables", "events"]),
      lastUpdated: lastUpdated("en"),
      docFooter: docFooter("en")
    }
  },
  zh: {
    lang: "zh",
    label: "简体中文",
    link: "/zh/",
    themeConfig: {
      nav: nav("zh"),
      editLink: editLink("zh"),
      sidebar: sidebar("zh", ["UIBuilder", "introduction", "composables", "events"]),
      lastUpdated: lastUpdated("zh"),
      docFooter: docFooter("zh")
    }
  }
}