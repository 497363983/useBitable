import { useTheme } from "@qww0302/use-bitable"
import { dashboard } from "@lark-base-open/js-sdk"

const theme = useTheme({
  onChanged: (mode) => {
    // Do something when theme mode changed
  },
  target: dashboard
})