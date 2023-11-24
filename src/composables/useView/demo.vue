<script setup lang="ts">
import { useView, useSelection } from "@qww0302/use-bitable"
import { ref, watch } from "vue"

const { tableId, viewId } = useSelection()
const { view } = useView(tableId, viewId)
const name = ref()
const type = ref()
const meta = ref()

watch(
  () => view.value,
  (v) => {
    name.value = "Loading..."
    type.value = "Loading..."
    meta.value = "Loading..."
    if (v) {
      Promise.all([
        v.getName().then((res) => (name.value = res)),
        v.getType().then((res) => (type.value = res)),
        v.getMeta().then((res) => (meta.value = res)),
      ])
    }
  }
)

</script>

<template>
  <div class="tip custom-block">
    <p class="custom-block-title">
      TIP
    </p>
    <p>Choose different view</p>
  </div>
  <div>
    Current View:
    <ul>
      <li>viewId: {{ view?.id }}</li>
      <li>tableId: {{ view?.tableId }}</li>
      <li>type: {{ type }}</li>
      <li>
        meta:
        <pre>{{ JSON.stringify(meta, null, 2) }}</pre>
      </li>
    </ul>
  </div>
</template>