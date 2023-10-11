import { bitable, type ThemeModeType } from "@lark-base-open/js-sdk"
import { onUnmounted } from "vue"

/**
 * Listen to theme change
 *
 * 监听主题变化
 *
 * @param callback
 * @returns
 */
export function onThemeChange(callback: (theme: ThemeModeType) => void) {
  const off = bitable.bridge.onThemeChange((e) => {
    callback(e.data.theme)
  })
  onUnmounted(() => {
    off()
  })
  return off
}