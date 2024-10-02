import { ref, computed } from "vue"
import type { ComputedRef } from "vue"
import { ThemeModeType } from "@lark-base-open/js-sdk"
import type { IBridge, IDashboard, IDashboardTheme } from "@lark-base-open/js-sdk"
import { onThemeChange } from "@qww0302/use-bitable"
import { tryOnMounted, BRIDGE, isBridge } from "@/shared"

export interface useThemeOptions<T extends IBridge | IDashboard> {
  onChanged?: (theme: T extends IBridge ? ThemeModeType : IDashboardTheme) => void
  /**
   * The target object(bridge or dashboard) to get the theme
   *
   * 获取主题的目标对象( bridge 或 dashboard )
   *
   * @since v1.0.0
   * @default bridge
   * @type {T}
   */
  target?: T
}

export function useTheme(options: useThemeOptions<IBridge>): ComputedRef<ThemeModeType>
export function useTheme(options: useThemeOptions<IDashboard>): ComputedRef<IDashboardTheme>

/**
 * Reactive bitable theme mode
 *
 * 响应式的bitable主题模式
 *
 * @param options
 * @returns
 */
export function useTheme<T extends IBridge | IDashboard>(
  options: useThemeOptions<T> = {}
) {
  const { onChanged, target = BRIDGE } = options
  const theme = ref<ThemeModeType | IDashboardTheme>((isBridge(target) ? ThemeModeType.LIGHT : {
    chartBgColor: "",
    labelColorTokenList: [],
    themePalette: [],
    theme: ThemeModeType.LIGHT
  }))
  onThemeChange({
    callback: (theme) => {
      // @ts-ignore
      theme.value = theme
      // @ts-ignore
      onChanged && onChanged(theme)
    },
    target
  })

  tryOnMounted(() => {
    target.getTheme().then((e) => {
      theme.value = e
    })
  })

  return computed(() => theme.value)
}