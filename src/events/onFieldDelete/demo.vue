<script setup lang="ts">
import { onFieldDelete, useSelection } from "@qww0302/use-bitable"
import type {IEventCbCtx} from "@lark-base-open/js-sdk"
import { ref } from "vue"

const { tableId } = useSelection()
const ev = ref<IEventCbCtx>()
onFieldDelete(tableId, (e) => {
  ev.value = e
})
</script>

<template>
  <div>
    Try to delete a field:
    <span v-if="ev">You have deleted a field successfully. </span>
    <pre>{{ JSON.stringify(ev, null, 2) }}</pre>
  </div>
</template>
