import { UserConfig } from "vitepress"
import { nav } from "./nav"
import { editLink } from "./editLink"
import { sidebar } from "./sideBar"
import { lastUpdated } from "./lastUpdated"

export const locales: UserConfig["locales"] = {
  root: {
    lang: "en",
    label: "English",
    themeConfig: {
      nav: nav("en"),
      editLink: editLink("en"),
      sidebar: sidebar("en", ["introduction", "composables", "events", "UIBuilder"]),
      lastUpdated: lastUpdated("en")
    }
  },
  zh: {
    lang: "zh",
    label: "简体中文",
    link: "/zh/",
    themeConfig: {
      nav: nav("zh"),
      editLink: editLink("zh"),
      sidebar: sidebar("zh", ["introduction", "composables", "events", "UIBuilder"]),
      lastUpdated: lastUpdated("zh")
    }
  }
}