import type { DefineComponent } from "vue"

export interface BaseComponent<Props extends Record<string | symbol | number, any>> {
  type: DefineComponent<Props> | string;
  props?: Props;
}