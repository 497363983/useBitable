<script setup lang="ts">
import { onRecordDelete, useSelection } from "@qww0302/use-bitable"
import type { IEventCbCtx } from "@lark-base-open/js-sdk"
import { ref } from "vue"

const { tableId } = useSelection()
const ev = ref<IEventCbCtx<[recordId: string]>>()
onRecordDelete(tableId, (e) => {
  ev.value = e
})
</script>

<template>
  <div>
    Try to modify a record:
    <span v-if="ev">You have deleted records {{ ev.data }}. </span>
    <pre>{{ JSON.stringify(ev, null, 2) }}</pre>
  </div>
</template>
