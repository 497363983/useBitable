import fg from "fast-glob"
import fs from "fs-extra"
import Git from "simple-git"
import { join } from "path"
import path from "path"
import { ca } from "element-plus/es/locale"

const ROOT_DIR = process.cwd()
const DOC_DIR = join(ROOT_DIR, "src")
const META_DIR = join(DOC_DIR, "_meta")
const git = Git(ROOT_DIR)

interface Meta {
  dir: string
  docPath: string
  fnPath: string
  changeTime: number
  lang: string
  name: string
  author: string
}

async function listDocs() {
  const files = await fg("**/*.md", {
    ignore: [
      "_*"
    ],
    cwd: DOC_DIR
  })
  const docs = await Promise.all(files.map(async (f) => {
    const docPath = f
    const fnPath = f.replace(/\.md$/, ".ts")
    try {
      const gitMeta = (await git.raw(['log', '--pretty=format:"%ad|%an"', fnPath]))?.replace(/"/g, '')?.split('\n')?.pop()?.split('|') ?? []
      const changeTime = new Date(gitMeta[0]).getTime() ?? ""
      const author = gitMeta[1] ?? ""
      const n = path.basename(f, ".md").split(".")
      const name = n[0]
      const lang = n[1] || "en"
      const dir = path.dirname(f)
      const meta: Meta = {
        dir,
        docPath,
        fnPath,
        changeTime,
        lang,
        name,
        author
      }
      return meta
    } catch (e) {
      console.log(e)
    }


  }))
  await fs.writeJSON(join(META_DIR, "index.json"), docs, {
    spaces: 2
  })
}

await listDocs()