import { bitable } from "@lark-base-open/js-sdk"
import { ref } from "vue"

/**
 * Get current user ID
 *
 * 获取当前用户 ID
 *
 * @returns
 */
export function useUserId() {
  const userId = ref<string | null>(null)
  bitable.bridge.getUserId().then((res) => {
    userId.value = res
  }).catch((e) => {
    console.error("[useBitable] useUserId Error: ", e)
  })
  return userId
}