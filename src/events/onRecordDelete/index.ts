import type { ITable, IEventCbCtx } from "@lark-base-open/js-sdk"
import { bitable } from "@lark-base-open/js-sdk"
import { MaybeRefOrGetter, watch, toValue, ref } from "vue"
import { tryOnScopeDispose } from "@/shared"


/**
 * Listen to record delete event
 *
 * 监听记录删除事件
 *
 * @param table
 * @param callback
 * @returns
 */
export function onRecordDelete(
  table: MaybeRefOrGetter<ITable | string | null>,
  callback: (ev: IEventCbCtx<[recordId: string]>) => void
) {
  let off: (() => void) = () => { }
  const pending = ref(false)
  function bindEvents(t: ITable | string | null) {
    if (!t) return
    if (typeof t === "string") {
      pending.value = true
      bitable.base.getTable(t).then(tbl => {
        tbl.onRecordDelete(callback)
        pending.value = false
      }).catch((e) => {
        pending.value = false
        console.error("[useBitable] onRecordDelete error:", e)
      })
    }
    else {
      off = t.onRecordDelete(callback)
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