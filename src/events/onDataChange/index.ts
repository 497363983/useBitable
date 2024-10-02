import { bitable } from "@lark-base-open/js-sdk"
import type { DataChangeCtx } from "@lark-base-open/js-sdk"
import { tryOnScopeDispose, tryOnMounted } from "@/shared"

type DataChangeCallback = (ev: DataChangeCtx) => void

/**
 * listen to data storage change event
 *
 * 监听数据存储变更事件
 *
 * @param fn
 * @returns
 */
export function onDataChange(fn: DataChangeCallback) {
  let off: () => void = () => void 0
  tryOnMounted(() => {
    off = bitable.bridge.onDataChange((ev) => {
      fn(ev.data)
    })
  })

  tryOnScopeDispose(() => {
    if (off) off()
  })

  return off
}