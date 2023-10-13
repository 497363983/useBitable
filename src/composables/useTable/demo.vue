<script setup lang="ts">
import { useTable, useSelection } from "@qww0302/use-bitable"
import { ref, watch } from "vue"

const { tableId } = useSelection()
const { table, pending } = useTable(tableId)
const name = ref()

watch(
  () => table.value,
  (t) => {
    name.value = null
    if (t) {
      t.getName().then(res => {
        name.value = res
      })
    }
  }
)

</script>

<template>
  <div class="tip custom-block">
    <p class="custom-block-title">
      TIP
    </p>
    <p>Choose different table</p>
  </div>
  <div>
    Table name:
    <span v-if="!pending && name">{{ name ?? "null" }}</span>
    <span v-else-if="pending || !name">loading table...</span>
  </div>
</template>