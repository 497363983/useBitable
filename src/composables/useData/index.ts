import { ref, watch, toValue, MaybeRefOrGetter, shallowRef, type Ref } from "vue"
import { bitable } from "@lark-base-open/js-sdk"
import { tryOnMounted } from "@/utils"

export interface Serializer<T = unknown, R = unknown> {
  read: (raw: R) => T
  write: (data: T) => R
}

/**
 * useData options
 *
 * useData 配置项
 */
interface useDataOptions<T = unknown, R = unknown> {
  /**
   * Serialization
   *
   * 序列化
   */
  serializer?: Serializer<T, R>
  /**
   * Whether to shallowly watch for changes
   *
   * 是否浅层监听变化
   *
   * @default false
   */
  shallow?: boolean
}

/**
 * Reactive Bitable data
 *
 * 响应式的 Bitable 数据
 *
 * @param options
 * @returns
 */
export function useData<T = unknown, R = T>(
  key: MaybeRefOrGetter<string>,
  defaults?: T,
  options?: useDataOptions<T, R>,
) {
  const { serializer, shallow = false } = options ?? {}
  // const origin = ref<R>()
  const data = (shallow ? shallowRef : ref)(defaults) as Ref<T>
  const pending = ref(false)
  const { read, write } = serializer ?? {
    read: (raw: R) => raw as unknown as T,
    write: (data: T) => data as unknown as R,
  }

  // const getOrigin = async () => {
  //   const raws = await bitable.bridge.getData<R>(toValue(key))
  //   origin.value = raws
  // }

  const save = async () => {
    pending.value = true
    bitable.bridge.setData<R>(toValue(key), write(toValue(data))).then(() => {
      pending.value = false
    })
  }
  watch(
    () => toValue(data),
    () => {
      save()
    },
    { deep: true },
  )
  tryOnMounted(() => {
    pending.value = true
    bitable.bridge.getData<R>(toValue(key)).then((res) => {
      data.value = read(res)
      pending.value = false
    })
    // bitable.bridge.onDataChange<R>((res) => {
    //   // data.value = read(res)
    //   console.log('data change', res)
    // })
  })
  return {
    data,
    pending,
  }
}