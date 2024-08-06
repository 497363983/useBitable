// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style/vars.css'
import './style/demo.css'
import './style/footer.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
