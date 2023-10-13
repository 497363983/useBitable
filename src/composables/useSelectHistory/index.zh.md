# useSelectHistory

## 用法

`useSelectHistory` 用于记录用户选择的历史，默认记录上限是无限（`Infinity`）。

<<<./_public/usage.ts

### 设置记录上限

可以通过 `options.max` 来设置记录上限，当记录数超过上限时，会自动删除最早的记录。

::: tip
建议设置一个合理的上限，避免占用过多内存。
:::

```ts
import { useSelectHistory } from "@qww0302/use-bitable"

const history = useSelectHistory({
  /**
   * 默认值为 Infinity
   */
  max: 10,
})
```
