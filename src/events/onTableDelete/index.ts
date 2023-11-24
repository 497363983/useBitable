import { bitable } from "@lark-base-open/js-sdk"
import type { IEventCbCtx } from "@lark-base-open/js-sdk"
import { tryOnScopeDispose } from "@/utils"

/**
 * Listen to table delete event
 *
 * 监听表格删除事件
 *
 * @param callback
 * @returns
 */
export function onTableDelete(callback: (ev: IEventCbCtx) => void) {
  const off = bitable.base.onTableDelete(callback)
  tryOnScopeDispose(off)
  return off
}