import type { ITable, IEventCbCtx } from "@lark-base-open/js-sdk"
import {bitable} from "@lark-base-open/js-sdk"
import { MaybeRefOrGetter, watch, toValue, ref } from "vue"
import { tryOnScopeDispose } from "@/shared"

/**
 * Listen to record modify event
 *
 * 监听记录修改事件
 *
 * @param table
 * @param callback
 * @returns
 */
export function onRecordModify(
  table: MaybeRefOrGetter<ITable | string | null>,
  callback: (ev: IEventCbCtx<{
    recordId: string;
    fieldIds: string[];
  }>) => void
) {
  let off: (() => void) = () => { }
  const pending = ref(false)
  function bindEvents(t: ITable | string | null) {
    if (!t) return
    if (typeof t === "string") {
      pending.value = true
      bitable.base.getTable(t).then(tbl => {
        tbl.onRecordModify(callback)
        pending.value = false
      }).catch((e) => {
        pending.value = false
        console.error("[useBitable] onRecordModify error:", e)
      })
    }
    else {
      off = t.onRecordModify(callback)
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