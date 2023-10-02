import { UserConfig } from "vitepress";
import meta from "../../src/_meta/index.json"
import { Meta } from "../../src/_meta/types"

export function rewrites() {
  const res: UserConfig["rewrites"] = {}
  for (const lang of Object.keys(meta as Record<string, Meta[]>)) {
    for (const page of meta[lang]) {
      res[`${page.docPath}`] = `${lang === 'en' ? '' : '/' + lang + '/'}${page.docPath.replace(/\.(.*?)(?=(.md))/g, "").replace(/(\d+)\_/g, "")}`
    }
  }
  console.log(res)
  return res
}