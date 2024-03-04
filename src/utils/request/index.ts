import { InternalAxiosRequestConfig } from "axios"

import { createCancelToken, HYRequest } from "./request"
import { CancelRequest } from "./types"

const requestInstance = new HYRequest({
  baseURL: import.meta.env.VITE_APP_API_FLAG,
  timeout: 1000 * 30,
  interceptorHooks: {
    requestInterceptor: (config: InternalAxiosRequestConfig) => {
      // ? do something
      // ...

      return config
    },
  },
})

export { createCancelToken, HYRequest, requestInstance }

export type { CancelRequest }
