import { DefaultTheme } from "vitepress"
import { license, author } from "../../package.json"

export const footer: DefaultTheme.Config["footer"] = {
  message: `Released under the ${license} License`,
  copyright: `Copyright © 2023-present ${author.name}`
}