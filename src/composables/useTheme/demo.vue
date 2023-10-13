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
  <div class="tip custom-block">
    <p class="custom-block-title">
      TIP
    </p>
    <p>Change the theme of <code>Bitable</code></p>
  </div>
  <p>Theme: {{ themeMode }}</p>
</template>