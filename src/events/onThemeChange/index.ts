import type { ThemeModeType, IDashboard, IBridge } from "@lark-base-open/js-sdk"
import { tryOnScopeDispose, BRIDGE, DASHBOARD } from "@/utils"

/**
 * Listen to theme change
 *
 * 监听主题变化
 *
 * @param callback
 * @returns
 */
export function onThemeChange(
  callback: (theme: ThemeModeType) => void,
  target: IDashboard | IBridge = BRIDGE
) {
  const off = target.onThemeChange((e) => {
    callback(e.data.theme)
  })
  tryOnScopeDispose(off)
  return off
}