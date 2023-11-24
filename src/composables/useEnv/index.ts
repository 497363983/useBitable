import { bitable, Product } from "@lark-base-open/js-sdk"
import { ref } from "vue"

/**
 * Get current environment
 *
 * 获取当前环境
 *
 * @returns
 */
export function useEnv() {
  const env = ref<Product | null>(null)
  bitable.bridge.getEnv().then((res) => {
    env.value = res.product
  }).catch((e) => {
    console.error("[useBitable] useEnv Error: ",e)
  })
  return env
}