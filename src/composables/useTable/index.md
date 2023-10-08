# useTable

## Usage

`useTable` returns a responsive `ITable` object, which changes in real time according to the parameters passed in. The passed-in value can be the `id` or `name` of the `table`.

::: tip
This function is based on [`getTable`](https://lark-base-team.github.io/js-sdk-docs/en/api/base#gettable), since the official `API` are all `async functions`, the update of `table` will be delayed. Therefore, this function provides `pending` to reflect the acquisition status, which is `true` when the `table` is being acquired.
:::

<<< ./_public/usage.ts
