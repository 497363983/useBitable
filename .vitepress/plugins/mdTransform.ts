import type { Plugin } from 'vite'
import { resolve, join } from 'node:path'
import { meta } from '../../src/_meta'
import { Meta } from '../../src/_meta/types'
import { getTypeDefinition, replacer } from "../../scripts/utils"
import { groupBy } from '../../.vitepress/scripts/utils'
import fs from 'fs-extra'


const root = resolve(__dirname, '../../')
const src = join(root, 'src')


/**
 * Vite plugin for md transform
 *
 * @reference https://github.com/vueuse/vueuse/blob/main/packages/.vitepress/plugins/markdownTransform.ts
 * @param options
 * @returns
 */
export function mdTransform(): Plugin {
  const functions = groupBy(
    Object
      .values(meta)
      .flat()
      .filter((item) => item.isFn),
    "lang"
  )
  return {
    name: 'md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return null
      code = code.replace(/\r\n/g, "\n")
      let lang = id.split('/').pop()?.replace(/\.md/g, '')?.split('.').pop() ?? 'en'
      if (!Object.keys(meta).includes(lang)) {
        lang = 'en'
      }

      const p = id.split('/')
      const name = p[p.length - 2]
      // console.log("id", id, name)
      const func = functions[lang].find((item) => item.name === name) as Meta | undefined
      if (func) {
        const { header, footer } = await getFuncMd(func, lang)
        const firstHeader = code.search(/\n#{2,6}\s.+/)
        const sliceIndex = firstHeader < 0 ? null : firstHeader
        // console.log(code, firstHeader, sliceIndex)
        if (header) {
          if (sliceIndex !== null) {
            code = code.slice(0, sliceIndex) + header + code.slice(sliceIndex)
          } else {
            code += header
          }
        }
        if (footer) {
          code = replacer(code, footer, 'FOOTER', 'tail')
        }
        if (!code.match(/---\n([\s\S]+?)\n---/)) {
          const frontmatter = fs.existsSync(join(src, func.dir, "frontmatter.yml"))
            ?
            await fs.readFile(join(src, func.dir, "frontmatter.yml"), "utf-8")
            :
            ""
          code = frontmatter ? `---\n${frontmatter}\n---\n\n${code}` : code
        }
      }
      code = code.replace(/(# \w+?)\n/, `$1\n\n<FunctionInfo func="${func?.name ?? ""}"/>\n<FunctionNotice/>\n\n`)
      return code
    },
  }
}

const title: Record<string, Record<string, string>> = {
  en: {
    type: "Type Declarations",
    demo: "Demo",
    showType: "Show Type Declarations",
    showCode: "Show demo code"
  },
  zh: {
    type: "类型声明",
    demo: "演示",
    showType: "显示类型声明",
    showCode: "显示演示代码"
  }
}

export async function getFuncMd(func: Meta, lang: string) {
  lang = Object.keys(title).includes(lang) ? lang : 'en'
  let type: string | undefined
  let typeSection: string = ""
  if (func && func.hasType && func.typePath) {
    type = await getTypeDefinition(join(src, func.typePath))
    // console.log("type", type)
    if (type) {
      const code = `\`\`\`typescript\n${type.trim()}\n\`\`\``
      typeSection = type.length > 1000
        ? `
## ${title[lang]['type']}

<details>
<summary>${title[lang]['showType']}</summary>

${code}

</details>
`
        : `\n## ${title[lang]['type']}\n\n${code}`
    } else {
      console.warn("No type Declaration file, please run `npm run build:types`")
    }
  }
  let demoSection: string = func.demoPath
    ?
    `
<script setup>
import { defineAsyncComponent } from 'vue'
const Demo = defineAsyncComponent(() => import('./demo.vue'))
</script>

## ${title[lang]['demo']}

<DemoWrapper src=\"https://github.com/497363983/useBitable/tree/main/src/${func.demoPath.replace("\\", "/")}\">
<ClientOnly>
  <Suspense>
    <Demo/>
    <template #fallback>
      Loading demo...
    </template>
  </Suspense>
</ClientOnly>
</DemoWrapper>
` + (func.demoPath ? `\n<details>\n<summary>${title[lang]['showCode']}</summary>\n\n::: code-group\n\<\<\< ./demo.vue\n:::\n\n</details>\n` : "")
    :
    ""

  const footer = typeSection
  const header = demoSection
  return {
    footer,
    header
  }
}