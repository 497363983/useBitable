<script setup lang="ts">
import { useRecordIdPage, useSelection, useTable } from "@qww0302/use-bitable";

const { tableId, viewId } = useSelection();
const { table } = useTable(tableId);
const { recordIds, pending, totalPage, curPage } = useRecordIdPage(table, {
  viewId,
  pageSize: 10,
});
const prevPage = () => {
  curPage.value -= 1;
};
const nextPage = () => {
  curPage.value += 1;
};
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else>
      <div v-for="recordId in recordIds" :key="recordId">
        {{ recordId }}
      </div>
    </div>
    <div>
      <button @click="prevPage" :disabled="pending || curPage === 0">Prev</button>
      <span>{{ curPage + 1 }} / {{ totalPage }}</span>
      <button @click="nextPage" :disabled="pending || curPage === totalPage">Next</button>
    </div>
  </div>
</template>
