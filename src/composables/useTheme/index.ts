import { ref, computed } from "vue"
import {
  bitable,
  ThemeModeType,
} from "@lark-base-open/js-sdk"
import { onThemeChange } from "@qww0302/use-bitable"
import { tryOnMounted } from "@/utils"

export interface useThemeOptions {
  onChanged?: (theme: ThemeModeType) => void
}

/**
 * Reactive bitable theme mode
 *
 * 响应式的bitable主题模式
 *
 * @param options
 * @returns
 */
export function useTheme(options: useThemeOptions = {}) {
  const themeMode = ref<ThemeModeType>(ThemeModeType.LIGHT)
  const { onChanged } = options

  onThemeChange((theme) => {
    // console.log("[useBitable/composables:useTheme] ", "theme change: ", theme)
    themeMode.value = theme
    onChanged && onChanged(theme)
  })

  tryOnMounted(() => {
    bitable.bridge.getTheme().then((e) => {
      themeMode.value = e
    })
  })

  return computed(() => themeMode.value)
}