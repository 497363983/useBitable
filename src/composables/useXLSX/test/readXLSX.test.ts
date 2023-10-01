import { readXLSX } from "../helper"
import { readFileSync } from "fs-extra"
import { describe, expect, it } from "vitest"
import { resolve } from "path"

describe("readXLSX", () => {
  it("should return WorkBook", async () => {
    const file = new File([readFileSync(resolve("test/assets/data.xlsx"))], "data.xlsx")
    const wb = await readXLSX(file)
    expect(wb).toMatchSnapshot()
  })
})