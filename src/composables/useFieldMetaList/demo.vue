<script setup lang="ts">
import { useFieldMetaList, useTable, useSelection } from "@qww0302/use-bitable"
import { FieldType } from "@lark-base-open/js-sdk"

const { tableId } = useSelection()
const { table } = useTable(tableId)
const { fieldMetaList, pending } = useFieldMetaList(table, {
  types: [FieldType.Text, FieldType.Number],
})
</script>

<template>
  <div>
    <p>Pending: {{ pending }}</p>
    <div style="overflow: auto; max-height: 200px">
      <ul>
        <li v-for="(fieldMeta, index) in fieldMetaList" :key="index">
          {{ fieldMeta.name }}[{{ fieldMeta.id }}](type: {{ fieldMeta.type }})
        </li>
      </ul>
    </div>
  </div>
</template>