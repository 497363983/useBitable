import { describe, expect, it } from "vitest"
import { useTheme } from "@qww0302/use-bitable"

describe("onThemeChange", () => {
  it("should be defined", () => {
    expect(useTheme).toBeDefined()
  })
})