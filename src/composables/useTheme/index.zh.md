# useTheme

## 用法

`useTheme` 是响应式的 `多维表格` 主题，它监听 `多维表格` 的主题变化，实时更新。

::: tip
由于官方的 `API` 中不支持插件修改 `多维表格` 主题，所以在这里 `useTheme` 返回的是一个**只读** `ref`，**不可修改**。
:::

::: warning
从多维表格官方 sdk 的 `v0.4.0-beta.5` 版本开始，支持了仪表盘主题，因此 `useTheme` 从 `v1.0.0` 版本开始支持传入 `target` 参数，用于指定主题的目标（`bridge` 或 `dashboard`，不传入时默认为 `bridge`）。
:::

<<< ./_public/usage.ts
