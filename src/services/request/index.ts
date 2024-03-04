import { createCancelToken, HYRequest } from "./request"

import type { CancelRequest } from "./types"
import type { InternalAxiosRequestConfig } from "axios"

const requestInstance = new HYRequest({
  baseURL: import.meta.env.VITE_APP_API_FLAG ?? window.Api.otherUrl,
  timeout: 1000 * 30,
  interceptorHooks: {
    requestInterceptor: (config: InternalAxiosRequestConfig) => {
      // ? do something
      // ...

      return config
    },
  },
})

const sRequestInstance = new HYRequest({
  baseURL: window.Api.sUrl,
  timeout: 1000 * 30,
  interceptorHooks: {
    requestInterceptor: (config: InternalAxiosRequestConfig) => {
      // ? do something
      // ...

      return config
    },
  },
})

export { createCancelToken, HYRequest, requestInstance, sRequestInstance }

export type { CancelRequest }
