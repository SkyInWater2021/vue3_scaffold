import path from "path"

import { defineConfig, loadEnv } from "vite"

import { useBuild } from "./build/build"
import { usePlugins } from "./build/plugins"
import { useServe } from "./build/server"

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
