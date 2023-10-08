import { bitable } from "@lark-base-open/js-sdk"
import { ref } from "vue"

/**
 * Get current environment
 *
 * 获取当前环境
 *
 * @returns
 */
export function useEnv() {
  const env = ref<string | null>(null)
  bitable.bridge.getEnv().then((res) => {
    env.value = res.product
  })
  return env
}