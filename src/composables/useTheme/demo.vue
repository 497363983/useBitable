<script setup lang="ts">
import { useTheme } from "@qww0302/use-bitable"

const themeMode = useTheme({
  onChanged: (mode) => {
    // console.log("Theme changed to", mode)
    document.querySelector("html")?.setAttribute("class", mode.toLowerCase())
  }
})
</script>

<template>
  <p>Theme: {{ themeMode }}</p>
</template>