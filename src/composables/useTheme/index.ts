import {
  ref,
  onUnmounted,
  onMounted,
} from "vue"
import {
  bitable,
  ThemeModeType,
} from "@lark-base-open/js-sdk"

export interface useThemeOptions {
  onChanged?: (theme: ThemeModeType) => void
}

/**
 * Reactive bitable theme mode
 * 
 * @param options
 * @returns
 */
export function useTheme(options: useThemeOptions = {}) {
  const themeMode = ref<ThemeModeType>(ThemeModeType.LIGHT)
  const { onChanged } = options
  onMounted(() => {
    bitable.bridge.getTheme().then((e) => {
      themeMode.value = e
    })
  })
  const unListenTheme = bitable.bridge.onThemeChange((ev) => {
    console.log("[useBitable/composables:useTheme] ", "theme change: ", ev.data.theme)
    themeMode.value = ev.data.theme
    onChanged && onChanged(ev.data.theme)
  })
  onUnmounted(() => {
    unListenTheme()
  })
  return {
    themeMode,
  }
}