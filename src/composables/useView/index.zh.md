# useView

## 用法

`useView` 返回的 `view` 为响应式的 `IView` 对象，实时根据传入的参数变化。

::: tip
该函数是基于 [`getViewById`](https://lark-base-team.github.io/js-sdk-docs/zh/api/table#getviewbyid) 实现的，由于官方的 `API` 均为 `异步函数`，所以 `view` 的更新会有一定延迟。因此，该函数提供了 `pending` 来反映获取状态，为 `true` 时则正在获取 `view`。
:::

<<< ./_public/usage.ts
