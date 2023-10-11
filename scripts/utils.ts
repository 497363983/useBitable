import fs from "fs-extra"

export async function getTypeDefinition(typePath: string) {
  if (!fs.existsSync(typePath)) return
  let types = await fs.readFile(typePath, "utf-8")
  if (!types) return
  types = types
    .replace(/export {}/g, "")
    .replace(/export[\s\S]+?from ?["'][\s\S]+?["']/g, "")
  const prettier = await import("prettier")
  return (await prettier.format(
    types,
    {
      semi: false,
      parser: "typescript",
    }
  )).trim()
}

/**
 *
 * @reference https://github.com/vueuse/vueuse/blob/c95a02bc46b9571f7a41fb6d7dc1ad03e548a3c0/scripts/utils.ts#L135
 * @param code
 * @param value
 * @param key
 * @param insert
 * @returns
 */
export function replacer(code: string, value: string, key: string, insert: "head" | "tail" | "none" = "none") {
  const START = `<!--${key}_STARTS-->`
  const END = `<!--${key}_ENDS-->`
  const regex = new RegExp(`${START}[\\s\\S]*?${END}`, "im")

  const target = value ? `${START}\n${value}\n${END}` : `${START}${END}`

  if (!code.match(regex)) {
    if (insert === "none")
      return code
    else if (insert === "head")
      return `${target}\n\n${code}`
    else
      return `${code}\n\n${target}`
  }

  return code.replace(regex, target)
}

