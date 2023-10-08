<script lang="ts" setup>
import { useEnv } from "@qww0302/use-bitable"
import { useData } from "vitepress"

const { lang } = useData()
const env = useEnv()

const notice: Record<string, string> = {
  zh: "请在多维表格中打开本文档查看完整效果",
  en: "Please open in Bitable to see the full effect",
}
</script>

<template>
  <div v-if="!env">
    <div class="warning custom-block">
      <p class="custom-block-title">WARNING</p>
      <p>{{ notice[Object.keys(notice).includes(lang) ? lang : "en"] }}</p>
    </div>
  </div>
</template>