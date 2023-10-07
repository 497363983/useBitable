<script setup lang="ts">
import { useSelectHistory } from "@qww0302/use-bitable"

const history = useSelectHistory({
  max: 10
})
</script>

<template>
  <p>History length: {{ history.length }}</p>
  <div style="overflow: auto;max-height: 200px;">
    <ul>
      <li
        v-for="(item, index) in history.slice().reverse()"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>