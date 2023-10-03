import { UserConfig } from "vitepress"
import { meta } from "../../src/_meta"

const guides = ["introduction"]
const references = ["UIBuilder", "composables", "events"]

export function rewrites() {
  const res: UserConfig["rewrites"] = {}
  for (const lang of Object.keys(meta)) {
    for (const page of meta[lang]) {
      res[`${page.docPath}`] = `${lang === 'en' ? '' : lang + '/'}${page.nav ? page.nav + '/' : ''}${page.docPath.replace(/\.(.*?)(?=(.md))/g, "").replace(/(\d+)\_/g, "")}`
    }
  }
  console.log(res)
  return res
}