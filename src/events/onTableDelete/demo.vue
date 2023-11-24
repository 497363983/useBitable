<script setup lang="ts">
import { onTableDelete } from "@qww0302/use-bitable"
import type { IEventCbCtx } from "@lark-base-open/js-sdk"
import { ref } from "vue"

const ev = ref<IEventCbCtx>()
onTableDelete((e) => {
  ev.value = e
})
</script>

<template>
  <div>
    Try to delete a table:
    <span v-if="ev">You have deleted a table. </span>
    <pre>{{ JSON.stringify(ev, null, 2) }}</pre>
  </div>
</template>
