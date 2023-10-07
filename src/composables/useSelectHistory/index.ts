import { onSelectionChange } from "@qww0302/use-bitable"
import { Selection } from "@lark-base-open/js-sdk"
import { ref } from "vue"

export type TimeStamp = number

export interface SelectHistory {
  select: Selection
  time: TimeStamp
}

export interface useSelectHistoryOptions {
  /**
   * Max history length
   *
   * 最大历史记录长度
   *
   * @default Infinity
   */
  max?: number
}

/**
 * Reactive bitable selection history
 *
 * 响应式的 `bitable` 选中项历史记录
 *
 * @param options
 * @returns
 */
export function useSelectHistory(options: useSelectHistoryOptions = {}) {
  const history = ref<SelectHistory[]>([])
  const { max = Infinity } = options
  onSelectionChange((e) => {
    history.value.push({
      select: e,
      time: Date.now(),
    })
    if (history.value.length > max) {
      history.value.shift()
    }
  })
  return history
}