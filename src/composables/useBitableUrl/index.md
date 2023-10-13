# useBitableUrl

## Usage

`useBitableUrl` is a wrapper of [`getBitableUrl`](https://lark-base-team.github.io/js-sdk-docs/en/api/bridge#getbitableurl), used to get the URL of the current multidimensional table. It is responsive and will change with the change of parameters such as `tableID`, `viewId`, `fieldId` and `recordId` passed in.

<<<./_public/usage.ts

### Custom `URL` parameters

It also supports custom `URL` parameters, just configure `params` in options.

```ts
const url = useBitableUrl(tableId, {
  params: {
    vb: "1.2222.2",
    // or other parameters you need
  },
  /**
   * Whether to override the original value when there are duplicate keys, the default is `false`
   * For example: The original BitableUrl has the table parameter, but if the table parameter is also configured in `options.params`,
   * By default, it will not override, but if set to `true`, it will override the original value.
   */
  override: true,
})
```
