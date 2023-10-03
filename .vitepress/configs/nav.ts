import { DefaultTheme } from "vitepress"

export const navContent: Record<string, Array<string>> = {
  guides: ["introduction"],
  references: ["UIBuilder", "composables", "events"]
}

const navMap: Record<string, DefaultTheme.Config["nav"]> = {
  en: [
    {
      text: "Home",
      link: "/"
    },
    {
      text: "Guide",
      link: "/guides/introduction/Get-started"
    },
    {
      text: "Reference",
      link: "/references/composables/useFileReader/index"
    }
  ],
  zh: [
    {
      text: "首页",
      link: "/zh/"
    },
    {
      text: "指南",
      link: "/zh/guides/introduction/快速开始"
    },
    {
      text: "参考",
      link: "/zh/references/composables/useFileReader/"
    }
  ]
}

export function nav(lang: string): DefaultTheme.Config["nav"] {
  return navMap[Object.keys(navMap).includes(lang) ? lang : "en"]
}