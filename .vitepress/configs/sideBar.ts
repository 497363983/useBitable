import { DefaultTheme } from "vitepress"
import { meta } from "../../src/_meta"
import { Meta } from "../../src/_meta/types"
import { groupBy, firstToUpper } from "../scripts/utils"
import { navContent } from "./nav"
import { rewrites } from "./rewrites"

export function sidebar(lang: string, domain: Array<string>) {
  const res: DefaultTheme.Config["sidebar"] = {}
  for (const key of Object.keys(navContent)) {
    res[`${lang === 'en' ? '' : '/' + lang}/${key}/`] = [] as Array<any>
  }
  const docs = meta[lang]
  const grouped = groupBy(docs, "domain") as Record<string, Meta[]>
  const rewritesRules = rewrites()
  for (const key of domain) {
    const pages = grouped[key]
    if (pages) {
      const item = {
        text: firstToUpper(key),
        collapsed: false,
        items: pages.map((page) => {
          const { docPath, name } = page
          return {
            text: name.replace(/-/g, " "),
            link: '/' + rewritesRules[docPath].replace(/\.md$/, "").replace(/\/index$/, "/")
          }
        })
      }
      const section = Object.keys(navContent).find(k => navContent[k].includes(key))
      //@ts-ignore
      res[`${lang === 'en' ? '' : '/' + lang}/${section}/`]!.push(item)
    }
  }
  // console.log(JSON.stringify(res, null, 2))
  return res
}