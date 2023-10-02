import fg from "fast-glob"
import fs from "fs-extra"
import Git from "simple-git"
import { join } from "path"
import path from "path"
import { groupBy } from "./utils"
import { Meta } from "../../src/_meta/types"

const ROOT_DIR = process.cwd()
const DOC_DIR = join(ROOT_DIR, "src")
const META_DIR = join(DOC_DIR, "_meta")
const git = Git(ROOT_DIR)



async function listDocs() {
  const files = await fg("**/*.md", {
    ignore: [
      "_*"
    ],
    cwd: DOC_DIR
  })
  const docs = await Promise.all(files.map(async (f) => {
    const docPath = f
    const dir = path.dirname(f)
    const isFn = fs.existsSync(join(DOC_DIR, dir, "index.ts"))
    const fnPath = isFn ? join(dir, "index.ts") : null
    try {
      const gitMeta = (await git.raw(['log', '--pretty=format:"%ad|%an"', "--", join(DOC_DIR, fnPath || docPath)]))?.replace(/"/g, '')?.split('\n')?.pop()?.split('|') ?? []
      const changeTime = new Date(gitMeta[0]).getTime() ?? ""
      const author = gitMeta[1] ?? ""
      const n = path.basename(f, ".md").split(".")
      const name = (n[0] === "index" ? dir.split("/").pop() : n[0]) ?? "index"
      const lang = n[1] || "en"
      const index = name.match(/^(\d+)(?=\_)/)?.[0]
      const meta: Meta = {
        dir,
        docPath,
        fnPath,
        changeTime,
        lang,
        name: name.replace(/^(\d+)\_/, ""),
        author,
        isFn,
        index: index ? parseInt(index) : undefined
      }
      return meta
    } catch (e) {
      // console.log(e)
    }
  }))

  await fs.writeJSON(join(META_DIR, "index.json"), groupBy(docs, "lang"), {
    spaces: 2
  })
}

await listDocs()