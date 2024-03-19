import path from "path"

import { VantResolver } from "@vant/auto-import-resolver"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { PluginOption } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

export function usePlugins(env: Record<string, string>) {
  const option: PluginOption[] = [
    vue(),

    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/cpn-icons")],
      symbolId: "icon-[dir]-[name]",
    }),

    Components({
      resolvers: [VantResolver()],
      dts: "types/components.d.ts",
    }),

    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      resolvers: [],
      dts: "types/auto-imports.d.ts",
      eslintrc: { enabled: true, filepath: "types/.eslintrc-auto-import.json" },
    }),

    createHtmlPlugin({
      minify: true,
      inject: {
        data: { title: env.VITE_APP_TITLE },
      },
    }),
  ]

  return option
}