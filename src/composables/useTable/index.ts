import { shallowRef, MaybeRefOrGetter, watch, toValue } from "vue"
import { bitable, ITable } from "@lark-base-open/js-sdk"

/**
 * Reactive table
 *
 * 响应式表格
 *
 * @param tableIdOrName
 * @returns
 */
export function useTable(tableIdOrName: MaybeRefOrGetter<string>) {
  const table = shallowRef<ITable | null>(null)
  watch(
    () => toValue(tableIdOrName),
    (id) => {
      if (!id) return
      bitable.base.getTable(id).then((res) => {
        table.value = res
      })
    },
    { immediate: true }
  )
  return table
}