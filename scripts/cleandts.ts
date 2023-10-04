import fg from "fast-glob"
import fs from "fs-extra"

/**
 * Clean up the generated types
 */
export async function cleanDts() {
  const files = await fg(["src/**/*.d.ts", ".vitepress/**/*.d.ts", "test/**/*.d.ts"])
  console.log("files", files)
  await Promise.all(files.map((file) => fs.remove(file)))
}

cleanDts()
  .then(() => console.log("Cleaned up the generated types"))
  .catch((e) => console.error(e))