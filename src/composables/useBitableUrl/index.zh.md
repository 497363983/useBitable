# useBitableUrl

## 用法

`useBitableUrl` 是对 [`getBitableUrl`](https://lark-base-team.github.io/js-sdk-docs/zh/api/bridge#getbitableurl) 的封装，用于获取当前多维表格的 URL。它是响应式的，会随传入的 `tableID`，`viewId`，`fieldId` 和 `recordId` 等参数的变化而变化。

<<<./_public/usage.ts

### 自定义 `URL` 参数

它也支持自定义 `URL` 参数，只需在options中配置params即可。

```ts
const url = useBitableUrl(tableId, {
  params: {
    vb: "1.2222.2",
    // 或者其他你需要的参数
  },
  /**
   * 当存在相同键时是否覆盖原有值，默认为 `false`
   * 例如：原本的 BitableUrl 带有 table 参数，但若在 `options.params` 中也配置了 table 参数，
   * 默认情况下不会覆盖，但若设置为 `true`，则会覆盖原有值。
   */
  override: true,
})
```
