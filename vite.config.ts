import path from "path"

import { defineConfig, loadEnv } from "vite"

import { useBuild } from "./vite/build"
import { usePlugins } from "./vite/plugins"
import { useServe } from "./vite/server"

const rootSrc = path.resolve(__dirname, "src")

export default ({ mode = "" }) => {
  const env = loadEnv(mode, process.cwd())

  const server = useServe(env)
  const plugins = usePlugins(env)
  const build = useBuild()

  return defineConfig({
    base: env.VITE_APP_ENV === "production" ? "./" : "/",
    resolve: { alias: { "@": rootSrc } },
    server,
    plugins,
    build,
  })
}
