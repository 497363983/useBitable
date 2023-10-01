import { onMounted, ref, watch, toValue } from "vue"
import { bitable } from "@lark-base-open/js-sdk"

interface useDataOptions {
  onChanged?: (data: Record<string, unknown>) => void
}
/**
 * Reactive bitable data
 * 响应式的bitable数据
 *
 * @param options
 * @returns
 */
export function useData<T extends Record<string, unknown> | undefined>(options: useDataOptions = {}) {
  const data = ref<T>()
  const { onChanged } = options
  onMounted(async () => {
    data.value = (await bitable.bridge.getData()) as T
  })
  watch(
    () => toValue(data),
    (newVal: T | undefined) => {
      if (newVal) {
        bitable.bridge.setData(newVal).then(() => {
          onChanged && onChanged(newVal)
        })
      }
    },
    { deep: true },
  )
  return {
    data,
  }
}