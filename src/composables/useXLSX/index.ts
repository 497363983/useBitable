import { MaybeRefOrGetter, ref, watch, toValue } from "vue"
import { readXLSX } from "./helper"
import { WorkBook } from "xlsx"

interface useXLSXOptions {
  transform?: (wb: WorkBook | undefined) => unknown
}

/**
 * Reactive xlsx/xls file
 *
 * @param file
 * @param options
 * @returns
 */
export function useXLSX(file: MaybeRefOrGetter<File>, options: useXLSXOptions = {}) {
  const pending = ref(false)
  const wb = ref<WorkBook>()
  const name = ref<string>("")
  const table = ref()
  const { transform } = options
  watch(
    () => toValue(file),
    async (f) => {
      pending.value = true
      wb.value = await readXLSX(f)
      name.value = f.name
      table.value = transform ? transform(toValue(wb)) : toValue(wb)
      pending.value = false
    },
    { deep: true }
  )
  return {
    pending,
    wb,
    name,
    table,
  }
}