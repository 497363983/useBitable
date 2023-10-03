import { DefaultTheme } from "vitepress"

const lastUpdatedMap: Record<string, DefaultTheme.Config["lastUpdated"]> = {
  en: {
    text: "Updated at",
    formatOptions: {
      dateStyle: "short",
      timeStyle: "long",
    }
  },
  zh: {
    text: "更新于",
    formatOptions: {
      dateStyle: "short",
      timeStyle: "long",
    }
  }
}

export function lastUpdated(lang: string): DefaultTheme.Config["lastUpdated"] {
  return lastUpdatedMap[Object.keys(lastUpdatedMap).includes(lang) ? lang : "en"]
}