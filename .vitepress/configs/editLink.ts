import { DefaultTheme } from "vitepress"

const editLinkMap: Record<string, DefaultTheme.Config["editLink"]> = {
  en: {
    pattern: 'https://github.com/497363983/useBitable/edit/main/src/:path',
    text: 'Edit this page on GitHub'
  },
  zh: {
    pattern: 'https://github.com/497363983/useBitable/edit/main/src/:path',
    text: '在 GitHub 上编辑此页'
  }
}

export function editLink(lang: string): DefaultTheme.Config["editLink"] {
  return editLinkMap[Object.keys(editLinkMap).includes(lang) ? lang : "en"]
}