<script setup lang="ts">
import {
  useRecordsPage,
  useTable,
  useSelection,
  useFieldMetaList,
} from "@qww0302/use-bitable";
import { ElButton, ElTableV2, vLoading } from "element-plus";
import { computed } from "vue";

const { tableId, viewId } = useSelection();
const { table } = useTable(tableId);
const { records, total, curPage, totalPage, pending } = useRecordsPage(table, {
  pageSize: 10,
  viewId: viewId,
});
const { fieldMetaList } = useFieldMetaList(table);
const columns = computed(() =>
  fieldMetaList.value.map((fieldMeta) => ({
    title: fieldMeta.name,
    prop: fieldMeta.id,
    key: fieldMeta.id,
    dataKey: fieldMeta.id,
    width: 150,
  })),
);
const rows = computed(() =>
  records.value.map((record) => {
    const row: Record<string, any> = {};
    fieldMetaList.value.forEach((fieldMeta) => {
      row[fieldMeta.id] = JSON.stringify(record.fields[fieldMeta.id]);
    });
    row.id = record.recordId;
    return row;
  }),
);
const next = () => {
  curPage.value += 1;
};
const prev = () => {
  curPage.value -= 1;
};
</script>

<template>
  <div>
    <p>Total: {{ total }}</p>
    <p>Pending: {{ pending }}</p>
    <p>Current page: {{ curPage + 1 }} / {{ totalPage }}</p>
    <ElButton @click="prev" :disabled="curPage === 0">Prev</ElButton>
    <ElButton @click="next">Next</ElButton>
    <ElTableV2
      :columns="columns"
      :data="rows"
      :width="400"
      :height="400"
      v-loading="pending"
      fixed
    />
  </div>
</template>
