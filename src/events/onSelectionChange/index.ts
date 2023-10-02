import { bitable, Selection } from "@lark-base-open/js-sdk"
import { onUnmounted } from "vue"

const events: Array<(e: Selection) => void> = []


/**
 * Listen to selection change
 *
 * @param callback
 * @returns
 */
export function onSelectionChange(callback: (e: Selection) => void) {
  events.push(callback)
  const unlistenSelection = bitable.base.onSelectionChange((e) => {
    events.forEach((cb) => {
      cb(e.data)
    })
  })
  onUnmounted(() => {
    unlistenSelection()
  })
  function off() {
    const index = events.indexOf(callback)
    return () => {
      if (index > -1) {
        events.splice(index, 1)
      }
    }
  }

  return off()
}