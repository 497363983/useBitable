<script setup lang="ts">
import { useSelection } from "@qww0302/use-bitable"

const {
  baseId,
  recordId,
  fieldId,
  viewId,
  tableId,
} = useSelection()
</script>

<template>
  <!-- Yes, this is the simplified `Develop tool` plugin without copy function -->
  <p>tableId: {{ tableId ?? "null" }}</p>
  <p>viewId: {{ viewId ?? "null" }}</p>
  <p>fieldId: {{ fieldId ?? "null" }}</p>
  <p>recordId: {{ recordId ?? "null" }}</p>
  <p>baseId: {{ baseId ?? "null" }}</p>
</template>