---
isFn: false
---

# 快速开始

## 安装

> 要使用完整的 `useBitable`，同时需要安装 [`vue@3`](https://cn.vuejs.org/)，[`element-plus`](https://element-plus.org/zh-CN/) 和 [`@lark-base-open/js-sdk`](https://lark-base-team.github.io/js-sdk-docs/zh/)。

::: tip 关于 `@lark-base-open/js-sdk` 的版本
对于部分项目，它们的 `@lark-base-open/js-sdk` 版本可能是 [`0.2.x`](https://bytedance.feishu.cn/docx/HjCEd1sPzoVnxIxF3LrcKnepnUf)，但这并不妨碍它们升级到 `0.3.x`，至少目前官方表明没有破坏性更改，高版本都完全向下兼容，并且 `0.3.x` 有着更完善的类型支持和更丰富的 `API`。升级到 `0.3.x` 不会影响到已有项目的正常运行。因此，本包默认采用 `0.3.x` 开发。
:::

:::code-group

<<< @/public/code/installation/npm.bash [npm]

<<< @/public/code/installation/yarn.bash [yarn]

<<< @/public/code/installation/pnpm.bash [pnpm]

:::

## 使用

> 所有函数都从 `@qww0302/use-bitable` 中导入, 函数列表与使用方法请参阅 [`参考`](/zh/references/composables/Overview)。

```ts
import { ... } from "@qww0302/use-bitable"
```
