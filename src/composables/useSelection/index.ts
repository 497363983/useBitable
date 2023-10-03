import { bitable, Selection } from "@lark-base-open/js-sdk"
import { ref, onUnmounted, onMounted } from "vue"
import { onSelectionChange } from ".."

interface useSelectionOptions {
  onChanged?: (selection: Selection) => void
}

/**
 * Reactive bitable selection
 * 响应式的bitable当前选中项
 *
 * @param options
 */
export function useSelection(options: useSelectionOptions = {}) {
  const baseId = ref<string | null>(null)
  const recordId = ref<string | null>(null)
  const fieldId = ref<string | null>(null)
  const viewId = ref<string | null>(null)
  const tableId = ref<string | null>(null)
  const { onChanged } = options
  onMounted(() => {
    bitable.base.getSelection().then((e) => {
      baseId.value = e.baseId
      recordId.value = e.recordId
      fieldId.value = e.fieldId
      viewId.value = e.viewId
      tableId.value = e.tableId
    })
  })

  const unListenSelection = onSelectionChange(async (e) => {
    baseId.value = e.baseId
    recordId.value = e.recordId
    fieldId.value = e.fieldId
    viewId.value = e.viewId
    tableId.value = e.tableId
    onChanged && onChanged(e)
  })

  onUnmounted(() => {
    unListenSelection()
  })
}