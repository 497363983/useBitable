import { type ITable, bitable, type IEventCbCtx } from "@lark-base-open/js-sdk"
import { MaybeRefOrGetter, watch, toValue, ref } from "vue"
import { tryOnScopeDispose } from "@/shared"

/**
 * Listen to record add event
 *
 * 监听记录添加事件
 *
 * @param table
 * @param callback
 * @returns
 */
export function onRecordAdd(table: MaybeRefOrGetter<ITable | string | null>, callback: (ev: IEventCbCtx<[recordId: string]>) => void) {
  let off: (() => void) = () => { }
  const pending = ref(false)
  function bindEvents(t: ITable | string | null) {
    if (!t) return
    if (typeof t === "string") {
      pending.value = true
      bitable.base.getTable(t).then(tbl => {
        tbl.onRecordAdd(callback)
        pending.value = false
      }).catch((e) => {
        pending.value = false
        console.error("[useBitable] onRecordAdd error:", e)
      })
    }
    else {
      off = t.onRecordAdd(callback)
    }
  }
  watch(() => toValue(table), (t, o) => {
    if (t !== o) {
      off()
      bindEvents(t)
    }
  }, { immediate: true })
  tryOnScopeDispose(off)
  return {
    off: () => {
      off()
    },
    pending
  }
}