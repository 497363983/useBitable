<script setup lang="ts">
import { onSelectionChange } from "@qww0302/use-bitable"
import { ref } from "vue"

interface History {
  tableId: string
  viewId: string
  recordId: string
  fieldId: string
  baseId: string
  time: string
}

const history = ref<History[]>([])

onSelectionChange((e) => {
  history.value.push({
    ...e,
    time: new Date().toLocaleTimeString(),
  })
})
</script>

<template>
  <div class="tip custom-block">
    <p class="cuatom-block-title">
      TIP
    </p>
    <p>Choose different table, view or cell.</p>
  </div>
  <p>Select history: </p>
  <div style="overflow: auto;max-height: 200px;">
    <ul>
      <li
        v-for="(h, index) in history.slice().reverse()"
        :key="index"
      >
        <p>Time: {{ h.time }}</p>
        <p>Table: {{ h.tableId }}</p>
        <p>View: {{ h.viewId }}</p>
        <p>Record: {{ h.recordId }}</p>
        <p>Field: {{ h.fieldId }}</p>
        <p>Base: {{ h.baseId }}</p>
      </li>
    </ul>
  </div>
</template>