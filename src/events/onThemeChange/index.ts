import { bitable, type ThemeModeType } from "@lark-base-open/js-sdk"
import { onUnmounted } from "vue"

export function onThemeChange(callback: (theme: ThemeModeType) => void) {
  const off = bitable.bridge.onThemeChange((e) => {
    callback(e.data.theme)
  })
  onUnmounted(() => {
    off()
  })
  return off
}