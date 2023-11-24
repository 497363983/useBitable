<script setup lang="ts">
import { onFieldAdd, useSelection } from "@qww0302/use-bitable"
import type { IEventCbCtx } from "@lark-base-open/js-sdk"
import { ref } from "vue"

const { tableId } = useSelection()
const ev = ref<IEventCbCtx>()
onFieldAdd(tableId, (e) => {
  ev.value = e
})
</script>

<template>
  <div>
    Try to add a field:
    <span v-if="ev">You have added a field, its id is {{ ev.data.fieldId }} and type is {{ ev.data.fieldType }}. </span>
    <pre>{{ JSON.stringify(ev, null, 2) }}</pre>
  </div>
</template>
