import { onMounted, ref, watch, toValue, toRaw } from "vue"
import { bitable } from "@lark-base-open/js-sdk"


export interface Serializer<T> {
  read: (raw: unknown) => T
  write: (data: T) => Record<string, unknown>
}

/**
 * useData options
 *
 * useData 配置项
 */
interface useDataOptions<T> {
  /**
   * Serialization
   *
   * 序列化
   */
  serializer?: Serializer<T>
}

/**
 * Reactive Bitable data
 *
 * 响应式的 Bitable 数据
 *
 * @param options
 * @returns
 */
export function useData<T>(options: useDataOptions<T> = {}) {
  const data = ref<T>()
  const { serializer } = options
  const { read, write } = serializer ?? {
    read: (raw: unknown) => raw as T,
    write: (data: T) => JSON.parse(JSON.stringify(data)) as Record<string, unknown>,
  }
  onMounted(() => {
    console.log("mounted")
    bitable.bridge.getData().then((res) => {
      data.value = read(res)
    })
  })
  watch(
    () => toValue(data),
    (newVal) => {
      if (newVal) {
        bitable.bridge.setData(write(toRaw(newVal)))
      }
    },
    { deep: true },
  )
  return {
    data,
  }
}