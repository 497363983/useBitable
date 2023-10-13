const docFooterMap = {
  en: {
    prev: "Previous page",
    next: "Next page"
  },
  zh: {
    prev: "上一页",
    next: "下一页"
  }
}

export function docFooter(lang: string): typeof docFooterMap["en"] {
  return docFooterMap[Object.keys(docFooterMap).includes(lang) ? lang : "en"]
}