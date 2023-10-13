export function groupBy(arr: Array<any>, key: string) {
  const res: Record<string, any[]> = {}
  arr.forEach((item) => {
    const val = item[key]
    if (!res[val]) {
      res[val] = []
    }
    // res[val] = res[val] || []
    res[val].push(item)
  })
  return res
}

export function firstToUpper(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function genLink(url: string, lang: string) {
  if (url.includes("://")) {
    return url
  } else {
    return `${lang === "en" ? "" : "/" + lang}${url.replace("\\", "/").replace("index.ts", "")}`
  }
}