import { execSync } from "node:child_process"
import { version } from "../package.json"
import fs from "fs-extra"
import { resolve } from "node:path"

execSync("npm run build", { stdio: "inherit" })

if (fs.existsSync(resolve("./dist/dist"))) {
  fs.removeSync(resolve("./dist/dist"))
}


let cmd = "npm publish --access public"

if (version.includes("beta")) {
  cmd += " --tag beta"
} else if (version.includes("alpha")) {
  cmd += " --tag alpha"
}

execSync(cmd, { stdio: "inherit" })