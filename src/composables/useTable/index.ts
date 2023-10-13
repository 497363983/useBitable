import { shallowRef, MaybeRefOrGetter, watch, toValue, ref } from "vue"
import { bitable, ITable } from "@lark-base-open/js-sdk"

/**
 * Reactive table
 *
 * 响应式表格
 *
 * @param tableIdOrName
 * @returns
 */
export function useTable(tableIdOrName: MaybeRefOrGetter<string | null>) {
  const table = shallowRef<ITable | null>(null)
  const pending = ref<boolean>(false)
  watch(
    () => toValue(tableIdOrName),
    (idOrName) => {
      if (!idOrName) return
      pending.value = true
      bitable.base.getTable(idOrName).then((res) => {
        table.value = res
        pending.value = false
      })
    },
    { immediate: true }
  )
  return {
    table,
    pending,
  }
}