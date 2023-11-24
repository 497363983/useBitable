import { type ITable, bitable, type IEventCbCtx } from "@lark-base-open/js-sdk"
import { MaybeRefOrGetter, watch, toValue, ref } from "vue"
import { tryOnScopeDispose } from "@/utils"

/**
 * Listen to field add event
 *
 * 监听字段增加事件
 *
 * @param table
 * @param callback
 * @returns
 */
export function onFieldAdd(table: MaybeRefOrGetter<ITable | string | null>, callback: (ev: IEventCbCtx<unknown>) => void) {
  let off: (() => void) = () => { }
  const pending = ref(false)
  function bindEvents(t: ITable | string | null) {
    if (!t) return
    if (typeof t === "string") {
      pending.value = true
      bitable.base.getTable(t).then(tbl => {
        tbl.onFieldAdd(callback)
        pending.value = false
      }).catch((e) => {
        pending.value = false
        console.error("[useBitable] onFieldAdd error:", e)
      })
    }
    else {
      off = t.onFieldAdd(callback)
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