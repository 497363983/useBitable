<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core"
import { meta } from "../../../src/_meta"
import type { Frontmatter } from "../../../src/_meta/types"
import { useData } from "vitepress"
import { computed } from "vue"

const props = defineProps<{
  func: string
}>()

const { frontmatter, lang } = useData()

const Meta = computed(() => meta[lang.value].find((m) => m.name === props.func))
const changeTime = Meta.value?.changeTime ? useTimeAgo(Meta.value?.changeTime) : null
function genLink(url: string) {
  if (url.includes("://")) {
    return url
  } else {
    return `${lang === 'en' ? '' : '/' + lang.value}${url}`
  }
}
</script>

<template>
  <div class="info" v-if="(frontmatter as Frontmatter).isFn">
    <ul>
      <template v-if="frontmatter.category">
        <li>
          <span class="label">Category: </span>
          <template v-for="c in frontmatter.category">
            <a :href="genLink(Object.values(c)[0] as string)">
              <code class="value">{{ Object.keys(c)[0] }}</code>
            </a>
          </template>
        </li>
      </template>
      <template v-if="frontmatter.relate">
        <li>
          <span class="label">Relate: </span>
          <template v-for="c in frontmatter.relate">
            <a :href="genLink(Object.values(c)[0] as string)">
              <code class="value">{{ Object.keys(c)[0] }}</code>
            </a>
          </template>
        </li>
      </template>
      <template v-if="frontmatter.dependencies">
        <li>
          <span class="label">Dependencies: </span>
          <template v-for="c in frontmatter.dependencies">
            <a :href="genLink(Object.values(c)[0] as string)">
              <code class="value">{{ Object.keys(c)[0] }}</code>
            </a>
          </template>
        </li>
      </template>
      <template v-if="changeTime">
        <li>
          <span class="label">Last Changed: </span>
          <span class="value">{{ changeTime }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.info ul {
  list-style: none;
  padding-left: 0;
  font-weight: 500;
}
</style>