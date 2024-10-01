---
isFn: false
---

# What is useBitable

:::warning
This library is still in early development.
:::

`useBitable` is inspired by [UIBuilder](https://bytedance.feishu.cn/docx/Dt2hdGiHtoP7jrx23N7cPqGBnWg) and [Vueuse](https://vueuse.org/), aiming to wrap [JS SDK](https://lark-base-team.github.io/js-sdk-docs/en/) of Feishu Official based on [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) of [Vue](https://v3.vuejs.org/), provide some useful [Composables](https://v3.vuejs.org/guide/composition-api-introduction.html#composables), and provide an [semi-ui-vue](https://www.kousum.asia/zh-CN/start/introduction/) version of `UIBuilder`, providing a more convenient way for users to build UI and plugin logic.

:::tip
Although this library tries its best to make the development experience friendly to novices, it is undeniable that using this library requires a certain foundation of `Vue` and `TypeScript`. If you are not familiar with `Vue` and `TypeScript`, it is recommended to learn relevant knowledge first.
:::

## Features

- 🚀 **UIBuilder**: Easily build [`semi-ui-vue`](https://www.kousum.asia/zh-CN/start/introduction/) style UI through code
- 🔧 **Composables**: Based on [`Composition API`](https://v3.vuejs.org/guide/composition-api-introduction.html) to wrap [`@lark-base-open/js-sdk`](https://lark-base-team.github.io/js-sdk-docs/en/)
- 🔆 **Interactive Demo**: Interactive demo attached to the documentation
- ⚡ **Lightweight**: No built-in third-party libraries, but depends on [`semi-ui-vue`](https://www.kousum.asia/zh-CN/start/introduction/), [`@lark-base-open/js-sdk`](https://lark-base-team.github.io/js-sdk-docs/en/) and [`Vue`](https://v3.vuejs.org/)
- 🦾 **TypeScript**: Written in TypeScript, providing complete type support
- 🌐 **Internationalization**: i18n support
- 📖 **Documentation**: Detailed documentation and examples
- 📦 **Components**: Provides some commonly used components

## Inspiration

- [`Vueuse`](https://vueuse.org/): A collection of essential Vue Composition API utils for your Vue 3 applications by [@antfu](https://github.com/antfu) and collaborators.
- [`UIBuilder`](https://bytedance.feishu.cn/docx/Dt2hdGiHtoP7jrx23N7cPqGBnWg): A UIBuilder developed by Feishu Official for Feishu `Bitable` plugin.
