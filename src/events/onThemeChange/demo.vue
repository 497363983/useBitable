<script setup lang="ts">
import { onThemeChange } from "@qww0302/use-bitable"
import { bitable } from "@lark-base-open/js-sdk"
import { ref, onMounted } from "vue"

const theme = ref("LIGHT")

onThemeChange((t) => {
  theme.value = t
})

onMounted(()=>{
  bitable.bridge.getTheme().then((t) => {
    theme.value = t
  })
})
</script>

<template>
  <div>
    Current theme: {{ theme }}
  </div>
</template>
