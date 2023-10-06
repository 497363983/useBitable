import { MaybeRefOrGetter, ref, toValue, watch } from "vue"
import { bitable, GetBitableUrlOptions } from "@lark-base-open/js-sdk"

export interface useBitableUrlOptions {
  /**
   * The params will be append to the url
   *
   * 附加参数
   */
  params?: Record<string, string> | (() => Record<string, string>)
  /**
   * If true, the url will be override by the params when same param key exists
   *
   * 如果为true，url将会被params覆盖，当存在相同的key时
   *
   * @default false
   */
  override?: boolean
}

/**
 * Reactive Bitable Url
 *
 * 响应式 Bitable Url
 *
 * @param table
 * @param view
 * @param field
 * @param record
 */
export function useBitableUrl(
  table: MaybeRefOrGetter<GetBitableUrlOptions["tableId"]>,
  view: MaybeRefOrGetter<GetBitableUrlOptions["viewId"]>,
  field?: MaybeRefOrGetter<GetBitableUrlOptions["fieldId"]>,
  record?: MaybeRefOrGetter<GetBitableUrlOptions["recordId"]>,
  options?: useBitableUrlOptions,
) {
  const url = ref<string>("")
  const { params, override } = options ?? {}
  watch(
    [
      () => toValue(table),
      () => toValue(view),
      () => toValue(field),
      () => toValue(record),
    ],
    (newVal) => {
      if (!newVal[0] && !newVal[1]) {
        url.value = ""
        return
      }
      bitable.bridge.getBitableUrl({
        tableId: newVal[0],
        viewId: newVal[1],
        fieldId: newVal[2] ?? null,
        recordId: newVal[3] ?? null,
      }).then((res) => {
        url.value = genUrl(res, override, typeof params === "function" ? params() : params)
      })
    },
    { immediate: true },
  )
  return url
}

function genUrl(url: string, override: boolean = false, params?: Record<string, string>) {
  const urlObj = new URL(url)
  if (!params) return urlObj.toString()
  Object.entries(params).forEach(([key, value]) => {
    if (urlObj.searchParams.has(key)) {
      if (override) {
        urlObj.searchParams.set(key, value)
      }
      return
    }
    urlObj.searchParams.append(key, value)
  })
  return urlObj.toString()
}