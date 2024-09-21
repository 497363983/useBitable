import type { ThemeModeType, IDashboard, IBridge } from "@lark-base-open/js-sdk"
import { tryOnScopeDispose, BRIDGE } from "@/utils"

export function onThemeChange(callback: (theme: ThemeModeType) => void): (() => void)
export function onThemeChange(callback: (theme: ThemeModeType) => void, target: IDashboard): void
export function onThemeChange(callback: (theme: ThemeModeType) => void, target: IBridge): (() => void)

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
  if (off) tryOnScopeDispose(off)
  return off
}