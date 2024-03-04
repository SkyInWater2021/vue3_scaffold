import { BuildOptions } from "vite"

export function useBuild() {
    const option:BuildOptions =  {
      chunkSizeWarningLimit: 512,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/[\\/]node_modules[\\/]/.test(id)) {
              if (/[\\/]vue[\\/]/.test(id)) return "vendor-vue"
              if (/[\\/]pinia[\\/]/.test(id)) return "vendor-pinia"
              if (/[\\/]vue-router[\\/]/.test(id)) return "vendor-vue-router"
              if (/[\\/]element-plus[\\/]/.test(id)) return "vendor-element-plus"
              if (/[\\/]axios[\\/]/.test(id)) return "vendor-axios"
              if (/[\\/]echarts[\\/]/.test(id)) return "vendor-echarts"
              if (/[\\/]dayjs[\\/]/.test(id)) return "vendor-dayjs"
              if (/[\\/]lodash[\\/]/.test(id)) return "vendor-lodash"
              return "vendor"
            }
          },
        },
      },
    }

    return option
}
