---
isFn: false
---

# 什么是 useBitable

:::warning
该库仍在初期开发中。
:::

`useBitable` 启发于飞书官方的 [`UIBuilder`](https://bytedance.feishu.cn/docx/Dt2hdGiHtoP7jrx23N7cPqGBnWg), 旨在基于 [`Vue`](https://cn.vuejs.org/) 的 [`Composition API`](https://cn.vuejs.org/guide/introduction.html#composition-api) 对飞书官方的 [`JS SDK`](https://lark-base-team.github.io/js-sdk-docs/zh/) 进行封装，提供一些有用的[组合式函数（Composables）](https://cn.vuejs.org/guide/reusability/composables.html)，并提供一个 [`element-plus`](https://element-plus.org/zh-CN/)版本的 `UIBuilder`，为使用者提供一个更为便捷的构建 UI 和插件逻辑的方式。

:::tip
尽管本库尽力使开发体验对新手友好，但不可否认的是，使用本库需要一定的 `Vue` 和 `TypeScript` 基础，如果你对 `Vue` 和 `TypeScript` 不熟悉，建议先学习一下相关知识。
:::

## 特性

- 🚀 **UIBuilder**：通过编码轻松构建 [`element-plus`](https://element-plus.org/zh-CN/) 风格的 UI
- 🔧 **Composables**：基于 [`Composition API`](https://cn.vuejs.org/guide/introduction.html#composition-api) 封装 [`@lark-base-open/js-sdk`](https://lark-base-team.github.io/js-sdk-docs/zh/) 提供了一些有用的工具
- 🔆 **交互式演示**：功能文档附带交互式演示
- ⚡ **轻量**：无内置第三方库, 但依赖于 [`element-plus`](https://element-plus.org/zh-CN/), [`@lark-base-open/js-sdk`](https://lark-base-team.github.io/js-sdk-docs/zh/) 和 [`Vue`](https://cn.vuejs.org/)
- 🦾 **TypeScript**：使用 TypeScript 编写, 提供完整的类型支持
- 🌐 **国际化**：支持i18n
- 📖 **文档**：详细的文档和示例
- 📦 **组件**：提供了一些常用的组件
