import { shallowRef, MaybeRefOrGetter, watchEffect, toValue, ref } from "vue"
import type { ITable, IView } from "@lark-base-open/js-sdk"
import { bitable } from "@lark-base-open/js-sdk"
import { tryOnScopeDispose } from "@/utils"


export function useView(table: MaybeRefOrGetter<ITable | string | null>, viewId: MaybeRefOrGetter<string | null>) {
  const view = shallowRef<IView | null>(null)
  const pending = ref(false)
  const getView = (table: ITable, viewId: string) => {
    if (!table || !viewId) return
    pending.value = true
    table.getViewById(viewId).then((v) => {
      view.value = v
      pending.value = false
    }).catch((e) => {
      console.error("[useView] useView Error: ", e)
      view.value = null
      pending.value = false
    })
  }
  const off = watchEffect(() => {
    const vId = toValue(viewId)
    const t = toValue(table)
    if (!vId || !t) return
    if (typeof t === "string") {
      pending.value = true
      bitable.base.getTable(t).then((tbl) => {
        getView(tbl, vId)
      }).catch((e) => {
        console.error("[useView] useView Error: ", e)
        view.value = null
        pending.value = false
      })
    }
    else {
      getView(t, vId)
    }
  })
  tryOnScopeDispose(off)
  return {
    view,
    pending
  }
}