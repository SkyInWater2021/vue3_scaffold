import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import { PluginOption } from 'vite'
import { createHtmlPlugin } from "vite-plugin-html"


export function usePlugins(env: Record<string, string>) {
 const option:PluginOption[]  =  [
  vue(),
  Components({
    resolvers: [ElementPlusResolver()],
    dts: "types/components.d.ts",
  }),

  AutoImport({
    imports: ["vue", "vue-router", "pinia"],
    resolvers: [ElementPlusResolver()],
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
