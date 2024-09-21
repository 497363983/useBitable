import type { ThemeModeType, IDashboard, IBridge, IDashboardTheme, IEventCbCtx, ThemeModeCtx } from "@lark-base-open/js-sdk"
import { tryOnScopeDispose, BRIDGE, isBridge } from "@/utils"

export interface OnThemeChangeOption<T extends IBridge | IDashboard> {
  /**
   * The target object(bridge or dashboard) to get the theme
   *
   * 获取主题的目标对象( bridge 或 dashboard )
   *
   * @default bridge
   * @type {IBridge | IDashboard}
   */
  target?: T
  callback: (theme: T extends IBridge ? ThemeModeType : IDashboardTheme) => void
}

export function onThemeChange(callback: (theme: ThemeModeType) => void): (() => void)
export function onThemeChange(option: OnThemeChangeOption<IBridge>): (() => void)
export function onThemeChange(option: OnThemeChangeOption<IDashboard>): void
export function onThemeChange<T extends IDashboard | IBridge>(option: OnThemeChangeOption<T>): void | (() => void)

/**
 * Listen to theme change
 *
 * 监听主题变化
 *
 * @param callback
 * @returns
 */
export function onThemeChange<T extends IDashboard | IBridge>(
  option: OnThemeChangeOption<T> | ((theme: ThemeModeType) => void)
) {
  if (typeof option === "function") {
    const off =  BRIDGE.onThemeChange((e) => {
      option(e.data.theme)
    })
    tryOnScopeDispose(off)
    return off
  }
  const { target = BRIDGE, callback } = option
  const off = target.onThemeChange((e: IEventCbCtx<ThemeModeCtx | IDashboardTheme>) => {
    // @ts-ignore
    callback(isBridge(target) ? e.data.theme : e.data)
  })
  if (off) tryOnScopeDispose(off)
  return off
}