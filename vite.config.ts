import path from "path"

import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import { defineConfig, loadEnv } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"

const rootSrc = path.resolve(__dirname, "src")

export default ({ mode = "" }) => {
  const env = loadEnv(mode, process.cwd()) // 获取.env文件里定义的环境变量

  return defineConfig({
    base: env.VITE_APP_ENV === "production" ? "./" : "/",
    resolve: { alias: { "@": rootSrc } },
    server: {
      hmr: true,
      open: true,
      host: true,
      port: undefined,
      proxy: {
        [env.VITE_APP_FLAG]: {
          target: env.VITE_APP_TARGET,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_FLAG}`), ""),
        },
      },
    },

    plugins: [
      vue(),
      Icons(),
      Components({
        resolvers: [
          IconsResolver({ prefix: "Icon", enabledCollections: ["ep"] }),
          ElementPlusResolver(),
        ],
        dts: "types/components.d.ts",
      }),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        resolvers: [ElementPlusResolver(), IconsResolver({ prefix: "Icon" })],
        dts: "types/auto-imports.d.ts",
        eslintrc: { enabled: true, filepath: "types/.eslintrc-auto-import.json" },
      }),

      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        },
      }),
    ],

    build: {
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/[\\/]node_modules[\\/]/.test(id)) {
              if (/[\\/]vue[\\/]/.test(id)) return "vendor-vue"
              if (/[\\/]pinia[\\/]/.test(id)) return "vendor-pinia"
              if (/[\\/]vue-router[\\/]/.test(id)) return "vendor-vue-router"
              if (/[\\/]element-plus[\\/]/.test(id)) return "vendor-element-plus"
              if (/[\\/]@element-plus[\\/]/.test(id)) return "vendor-@element-plus-icons"
              if (/[\\/]axios[\\/]/.test(id)) return "vendor-axios"
              if (/[\\/]echarts[\\/]/.test(id)) return "vendor-echarts"
              if (/[\\/]dayjs[\\/]/.test(id)) return "vendor-dayjs"
              if (/[\\/]lodash[\\/]/.test(id)) return "vendor-lodash"
              return "vendor"
            }
          },
        },
      },
    },
  })
}
