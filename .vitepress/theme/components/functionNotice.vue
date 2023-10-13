<script setup lang="ts">
import { useData } from "vitepress"

const { frontmatter, lang } = useData()
const content: Record<string, Record<string, string>> = {
  en: {
    title: "Notice",
    content: "This function needs to use in Base, please use this website as a plugin in a Base to see the demo."
  },
  zh: {
    title: "提示",
    content: "该函数需要在一个多维表格中使用，请将本文档作为一个插件在多维表格上使用以查看演示。"
  }
}
</script>

<template>
  <div v-if="frontmatter.needBase" class="tip custom-block">
    <p class="custom-block-title">{{ content[lang]["title"] }}</p>
    <p>{{ content[lang]["content"] }}</p>
  </div>
</template>