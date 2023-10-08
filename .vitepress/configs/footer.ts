import { DefaultTheme } from "vitepress"
import { license, author } from "../../package.json"

export const footer: DefaultTheme.Config["footer"] = {
  message: `Released under the <a class="footer-link" href="https://github.com/497363983/useBitable/blob/main/LICENSE" target="_blank">${license}</a> License`,
  copyright: `Copyright © 2023-present <a class="footer-link" href="${author.url}" target="_blank">${author.name}</a>`
}