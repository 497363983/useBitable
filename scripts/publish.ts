import { execSync } from "node:child_process"
import { version } from "../package.json"

execSync("npm run build", { stdio: "inherit" })
execSync("rm -r dist/dist", { stdio: "inherit" })

let cmd = "npm publish --access public"

if (version.includes("beta")) {
  cmd += " --tag beta"
}else if (version.includes("alpha")) {
  cmd += " --tag alpha"
}

execSync(cmd, { stdio: "inherit" })