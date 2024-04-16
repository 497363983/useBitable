import { bitable } from "@lark-base-open/js-sdk"
import { ref } from "vue"

/**
 * Get current tenant ID
 *
 * 获取当前租户 ID
 *
 * @returns
 */
export function useTenantKey() {
  const tenantKey = ref<string | null>(null)
  bitable.bridge.getTenantKey().then((res) => {
    tenantKey.value = res
  }).catch((e) => {
    console.error("[useBitable] useTenantKey Error: ", e)
  })
  return tenantKey
}