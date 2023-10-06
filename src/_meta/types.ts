export interface Meta {
  dir: string
  docPath: string
  fnPath: string | null
  changeTime: number
  lang: string
  name: string
  author: string
  isFn: boolean
  index?: number
  domain: string
  nav: string
  demoPath: string | null
  hasDemo: boolean
  hasType: boolean
  typePath: string | null
  title: string
}

export type Frontmatter = {
  category: Array<Record<string, string>>
  lang: string
  isFn: boolean
  relate: Array<Record<string, string>>
  dependencies: Array<Record<string, string>>
  needBase: boolean
}