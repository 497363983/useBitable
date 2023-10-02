import { UserConfig } from "vitepress"

export const locales: UserConfig["locales"] = {
  root: {
    lang: "en",
    label: "English"
  },
  zh: {
    lang: "zh",
    label: "简体中文",
    link: "/cn/"
  }
}