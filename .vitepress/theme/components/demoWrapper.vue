<script setup lang="ts">
import { onErrorCaptured, ref } from "vue"
import { useEnv } from "@qww0302/use-bitable"
import { useData } from "vitepress"

const { lang } = useData()

defineProps<{
  src: string;
}>();

const env = useEnv();

const error = ref<Error | null>(null);

const notice: Record<string, string> = {
  zh: "请在多维表格中打开本文档查看完整效果",
  en: "Please open in Bitable to see the full effect",
}

onErrorCaptured((err) => {
  error.value = err;
});
</script>

<template>
  <div v-if="!env">
    <div class="warning custom-block">
      <p class="custom-block-title">WARNING</p>
      <p>{{ notice[Object.keys(notice).includes(lang) ? lang : "en"] }}</p>
    </div>
  </div>
  <div class="demo">
    <p>
      <a class="demo-source-link" :href="src">Source</a>
    </p>
    <slot />
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<style></style>
