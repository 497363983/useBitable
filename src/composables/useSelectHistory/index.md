# useSelectHistory

## Usage

`useSelectHistory` is used to record the user's selection history, and the default recording limit is unlimited (`Infinity`).

<<<./_public/usage.ts

### Set the recording limit

You can set the recording limit through `options.max`. When the number of records exceeds the limit, the earliest record will be automatically deleted.

::: tip
It is recommended to set a reasonable limit to avoid occupying too much memory.
:::

```ts
import { useSelectHistory } from "@qww0302/use-bitable"

const history = useSelectHistory({
  /**
   * The default value is Infinity
   */
  max: 10,
})
```
