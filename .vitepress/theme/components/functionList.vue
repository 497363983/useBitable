<script lang="ts" setup>
import { meta } from "../../../src/_meta"
import { Meta } from "../../../src/_meta/types"
import { watch, ref } from "vue"
import { useData } from "vitepress"
import { genLink } from "../../scripts/utils"

const props = defineProps<{
  module: string
}>()
const functions = ref<Meta[]>([])
const { frontmatter, lang } = useData()

watch(() => props.module, (module) => {
  console.log(module)
  if (!module) return
  functions.value = meta["en"].filter((f) => f.dir.includes(module) && f.fnPath !== null)
  console.log(functions.value, meta["en"], frontmatter.value)
}, { immediate: true })


</script>
<template>
  <div class="function-list">
    <ul>
      <template v-for="fn in functions" :key="(fn.fnPath as string)">
        <li>
          <a :href="genLink(`/references/${(fn.fnPath as string)}`, lang)"><code>{{ fn.name }}</code></a>
          <span v-if="fn.description"> - {{ ((fn.description as Record<string, string>[]).find((i: any) =>
            Object.keys(i).includes(lang)) as Record<string, string>)[lang]
          }}</span>
        </li>
      </template>
    </ul>
    {{ frontmatter.description }}
    <!-- {{ functions }} -->
  </div>
</template>