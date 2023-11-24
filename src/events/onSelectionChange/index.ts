import { bitable, Selection } from "@lark-base-open/js-sdk"
import { tryOnScopeDispose } from "@/utils"

/**
 * Listen to selection change
 *
 * 监听选中项变化
 *
 * @param callback
 * @returns
 */
export function onSelectionChange(callback: (e: Selection) => void) {
  const off = bitable.base.onSelectionChange((e) => {
    callback(e.data)
  })
  tryOnScopeDispose(off)
  return off
}