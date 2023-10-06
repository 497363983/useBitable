<script setup lang="ts">
import { useBitableUrl, useSelection } from "@qww0302/use-bitable"

const {
  recordId,
  fieldId,
  viewId,
  tableId,
} = useSelection()

const url = useBitableUrl(tableId, viewId, fieldId, recordId, {
  params: {
    vb: "1.2222.2",
  }
})

</script>

<template>
  <div>
    <p>Choose different table, view or cell: </p>
    <p>{{ url }}</p>
  </div>
</template>