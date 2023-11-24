<script setup lang="ts">
import { onRecordModify, useSelection } from "@qww0302/use-bitable"
import type { IEventCbCtx } from "@lark-base-open/js-sdk"
import { ref } from "vue"

const { tableId } = useSelection()
const ev = ref<IEventCbCtx<{
  recordId: string;
  fieldIds: string[];
}>>()
onRecordModify(tableId, (e) => {
  ev.value = e
})
</script>

<template>
  <div>
    Try to modify a record:
    <span v-if="ev">You have modified fields {{ ev.data.fieldIds }} of record {{ ev.data.recordId }}. </span>
    <pre>{{ JSON.stringify(ev, null, 2) }}</pre>
  </div>
</template>
