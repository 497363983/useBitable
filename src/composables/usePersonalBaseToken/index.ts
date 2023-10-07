import { bitable } from "@lark-base-open/js-sdk"
import { ref, onMounted } from "vue"

export function usePersonalBaseToken() {
  const token = ref("")
  onMounted(() => {
    bitable.bridge.getPersonalBaseToken().then((res) => {
      token.value = res
    })
  })
  return token
}