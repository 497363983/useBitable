import { getCurrentScope, onScopeDispose } from "vue"

/**
 * Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
 *
 * @see https://github.com/vueuse/vueuse/blob/main/packages/shared/tryOnScopeDispose/index.ts
 * @param fn
 */
export function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}