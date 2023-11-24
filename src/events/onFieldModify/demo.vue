<script setup lang="ts">
import { onFieldModify, useSelection } from "@qww0302/use-bitable"
import type {IEventCbCtx} from "@lark-base-open/js-sdk"
import { ref } from "vue"

const { tableId } = useSelection()
const ev = ref<IEventCbCtx>()
onFieldModify(tableId, (e) => {
  ev.value = e
})
</script>

<template>
  <div>
    Try to modify a field:
    <span v-if="ev">You have modified field {{ ev.data.fieldId }}, its type is {{ ev.data.fieldType }} now. </span>
    <pre>{{ JSON.stringify(ev, null, 2) }}</pre>
  </div>
</template>
