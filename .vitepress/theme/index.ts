// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import './style/vars.css'
import './style/demo.css'
import './style/footer.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
