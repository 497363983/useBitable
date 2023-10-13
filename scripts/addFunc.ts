import fs from "fs-extra"
import { join } from "path"

const ROOT_DIR = process.cwd()
const SRC_DIR = join(ROOT_DIR, "src")
const TEMPLATE_DIR = join(SRC_DIR, "_meta/_template")

export async function addFunc(name: string, dir: string) {
  const func = `export function ${name}() {}`
  const enDoc = (await fs.readFile(join(TEMPLATE_DIR, "index.md"), "utf-8")).replace(/{{title}}/g, name)
  const zhDoc = (await fs.readFile(join(TEMPLATE_DIR, "index.zh.md"), "utf-8")).replace(/{{title}}/g, name)
  const frontMatter = `
isFn: true
needBase: true
category:
  - Composables: /references/composables/Overview
`
  const test = (await fs.readFile(join(TEMPLATE_DIR, "index.test.ts"), "utf-8")).replace(/{{name}}/g, name)
  const demo = (await fs.readFile(join(TEMPLATE_DIR, "demo.vue"), "utf-8"))

  const funcDir = join(SRC_DIR, dir, name)
  await fs.ensureDir(funcDir)
  await fs.writeFile(join(funcDir, "index.ts"), func)
  await fs.writeFile(join(funcDir, "index.md"), enDoc)
  await fs.writeFile(join(funcDir, "index.zh.md"), zhDoc)
  await fs.writeFile(join(funcDir, "frontmatter.yml"), frontMatter)
  await fs.writeFile(join(funcDir, "index.test.ts"), test)
  await fs.writeFile(join(funcDir, "demo.vue"), demo)
  console.log(`Function ${name} created!`)
}

addFunc(process.argv[2], process.argv[3])