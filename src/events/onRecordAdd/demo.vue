<script setup lang="ts">
import { onRecordAdd, useSelection } from "@qww0302/use-bitable"
import type { IEventCbCtx } from "@lark-base-open/js-sdk"
import { ref } from "vue"

const { tableId } = useSelection()
const ev = ref<IEventCbCtx<[recordId: string]>>()
onRecordAdd(tableId, (e) => {
  ev.value = e
})
</script>

<template>
  <div>
    Try to add records:
    <span v-if="ev">You have added {{ ev.data.length }} record{{ ev.data.length > 1 ? "s" : "" }}. </span>
    <pre>{{ JSON.stringify(ev, null, 2) }}</pre>
  </div>
</template>
