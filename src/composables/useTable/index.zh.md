# useTable

## 用法

`useTable` 返回的 `table` 为响应式的 `ITable` 对象，实时根据传入的参数变化。传入的值可以为 `table` 的 `id` 或者 `name`。

::: tip
该函数是基于 [`getTable`](https://lark-base-team.github.io/js-sdk-docs/zh/api/base#gettable) 实现的，由于官方的 `API` 均为 `异步函数`，所以 `table` 的更新会有一定延迟。因此，该函数提供了 `pending` 来反映获取状态，为 `true` 时则正在获取 `table`。
:::

<<< ./_public/usage.ts
