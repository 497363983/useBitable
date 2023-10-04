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
}