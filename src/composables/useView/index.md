# useView

## Usage

`useView` returns a reactive `IView` object, which changes in real time according to the incoming parameters.

::: tip

This function is based on [`getViewById`](https://lark-base-team.github.io/js-sdk-docs/en/api/table#getviewbyid) implementation, because the official `API` are `asynchronous functions`, so the update of `view` will have a certain delay. Therefore, this function provides `pending` to reflect the acquisition status, which is `true` when the `view` is being acquired.

:::

<<< ./_public/usage.ts
