import { DefaultTheme } from "vitepress"

export const navContent: Record<string, Array<string>> = {
  guides: ["introduction"],
  references: ["UIBuilder", "composables", "events"]
}

const navMap: Record<string, DefaultTheme.Config["nav"]> = {
  en: [
    {
      text: "Home",
      link: "/",
      activeMatch: "^/$"
    },
    {
      text: "Guide",
      link: "/guides/introduction/Get-started",
      activeMatch: "^/guides/"
    },
    {
      text: "Reference",
      link: "/references/UIBuilder/Overview",
      activeMatch: "^/references/"
    }
  ],
  zh: [
    {
      text: "首页",
      link: "/zh/",
      activeMatch: "\/zh\/$"
    },
    {
      text: "指南",
      link: "/zh/guides/introduction/Get-started",
      activeMatch: "^/zh/guides/"
    },
    {
      text: "参考",
      link: "/zh/references/UIBuilder/Overview",
      activeMatch: "^/zh/references/"
    }
  ]
}

export function nav(lang: string): DefaultTheme.Config["nav"] {
  return navMap[Object.keys(navMap).includes(lang) ? lang : "en"]
}