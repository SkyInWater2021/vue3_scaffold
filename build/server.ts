import type { ServerOptions } from "vite"

export function useServe(env: Record<string, string>) {
    const option:ServerOptions =  {
      hmr: true,
      open: true,
      host: true,
      port: undefined,
      proxy: {
        [env.VITE_APP_API_FLAG]: {
          target: env.VITE_APP_API,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_API_FLAG}`), ""),
        },
      },
    }

    return option
}
