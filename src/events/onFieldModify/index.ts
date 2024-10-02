import { type ITable, bitable, type IEventCbCtx } from "@lark-base-open/js-sdk"
import { MaybeRefOrGetter, watch, toValue, ref } from "vue"
import { tryOnScopeDispose } from "@/shared"

/**
 * Listen to field modify event
 *
 * 监听字段修改事件
 *
 * @param table
 * @param callback
 * @returns
 */
export function onFieldModify(table: MaybeRefOrGetter<ITable | string | null>, callback: (ev: IEventCbCtx<unknown>) => void) {
  let off: (() => void) = () => { }
  const pending = ref(false)
  function bindEvents(t: ITable | string | null) {
    if (!t) return
    if (typeof t === "string") {
      pending.value = true
      bitable.base.getTable(t).then(tbl => {
        tbl.onFieldModify(callback)
        pending.value = false
      }).catch((e) => {
        pending.value = false
        console.error("[useBitable] onFieldModify error:", e)
      })
    }
    else {
      off = t.onFieldModify(callback)
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