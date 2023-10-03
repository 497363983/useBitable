import metaJSON from "./index.json"
import { Meta } from "./types"

export const meta = metaJSON as Record<string, Meta[]>