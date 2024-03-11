import { ServerOptions } from "vite"

export function useServe(env: Record<string, string>) {
    const option:ServerOptions =  {
      hmr: true,
      open: true,
      host: true,
      port: 5999,
      proxy: {
        [env.VITE_APP_API_FLAG]: {
          target: env.VITE_APP_API,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_API_FLAG}`), ""),
        },

        // CME代理
        "/CMEDATA": {
          target: "http://111.205.114.94:12308/CMEDATA", // 目标服务器111.205.114.94\111.205.114.94
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/CMEDATA/, '/')
        },
      },
    }

    return option
}
