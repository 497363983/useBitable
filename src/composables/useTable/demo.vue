<script setup lang="ts">
import { useTable, useSelection } from "@qww0302/use-bitable"
import { ref, watch } from "vue"

const { tableId } = useSelection()
const table = useTable(tableId)
const name = ref("")

watch(
  () => table.value,
  (t)=>{
    name.value = ""
    if(t) {
      t.getName().then(res=>{
        name.value = res
      })
    }
  }
)

</script>

<template>
  <div>
    Table name: 
    <span v-if="name">{{ name }}</span>
    <span v-else>loading table name...</span>
  </div>
</template>