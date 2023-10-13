<script setup lang="ts">
import { useFileReader } from "@qww0302/use-bitable"
import { ref } from "vue"
import XLSX from "xlsx"
import { markdownTable } from "markdown-table"

const fileInput = ref<HTMLInputElement | null>(null)
const progress = ref(0)
const file = ref<File | null>(null)
const { name, pending, data } = useFileReader<Array<Array<string>>>(file, {
  onProgress: (e: ProgressEvent<FileReader>) => {
    progress.value = e.loaded / e.total
  },
  load(data, resolve) {
    const wb = XLSX.read(data, { type: "buffer" })
    const table = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
      header: 1,
    }) as Array<Array<string>>
    console.log(table)
    resolve(table)
  }
})

const handleChange = (e: Event) => {
  if ((e.target as HTMLInputElement).files!.length === 0) {
    progress.value = 0
    return
  }
  file.value = (e.target as HTMLInputElement).files![0]
}

const clear = () => {
  file.value = null
  fileInput.value!.value = ""
  progress.value = 0
}
</script>

<template>
  Choose a xls/xlsx file:
  <input
    ref="fileInput"
    accept=".xls,.xlsx"
    type="file"
    @change="handleChange"
  >
  <ul>
    <li>Name: {{ name }}</li>
    <li>Pending: {{ pending }}</li>
    <li>Progress: {{ progress }}</li>
  </ul>
  Data:
  <div style="overflow: auto;max-height: 200px;">
    <pre><code>{{ JSON.stringify(data, null, 2) }}</code></pre>
  </div>
  Table:
  <div style="overflow: auto;max-height: 200px;">
    <pre><code>{{ markdownTable(data ?? []) ?? "No Data" }}</code></pre>
  </div>

  <button @click="clear">
    Clear
  </button>
</template>
