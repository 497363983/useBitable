import type { IBridge } from "@lark-base-open/js-sdk"

export function isBridge(target: any): target is IBridge {
  return (target as IBridge).registerBridgeEvent !== undefined
}