import { bitable } from "@lark-base-open/js-sdk"
import type { IEventCbCtx } from "@lark-base-open/js-sdk"
import { tryOnScopeDispose } from "@/utils"

/**
 * Listen to table add event
 *
 * 监听表格添加事件
 *
 * @param callback
 * @returns
 */
export function onTableAdd(callback: (ev: IEventCbCtx) => void) {
  const off = bitable.base.onTableAdd(callback)
  tryOnScopeDispose(off)
  return off
}