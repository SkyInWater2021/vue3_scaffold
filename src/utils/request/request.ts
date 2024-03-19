import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios"

import { CancelRequest, HYRequestConfig, HYRequestInterceptors } from "./types"

class HYRequest {
  instance: AxiosInstance
  interceptorHooks?: HYRequestInterceptors

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptorHooks = config.interceptorHooks
    this.setupInterceptor()
  }

  setupInterceptor() {
    this.instance.interceptors.request.use(
      config => config,
      err => err,
    )

    this.instance.interceptors.response.use(
      res => res,
      err => err,
    )

    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch,
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch,
    )
  }

  request<T = unknown>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptorHooks?.requestInterceptor) {
        config = config.interceptorHooks.requestInterceptor(config as InternalAxiosRequestConfig)
      }

      this.instance
        .request(config)
        .then(response => {
          if (config.interceptorHooks?.responseInterceptor) {
            response = config.interceptorHooks.responseInterceptor(response)
          }
          resolve(response.data)
        })
        .catch(err => reject(err))
    })
  }

  get<T = unknown>(config: HYRequestConfig) {
    return this.request<T>({ ...config, method: "GET" })
  }
  post<T = unknown>(config: HYRequestConfig) {
    return this.request<T>({ ...config, method: "POST" })
  }
  delete<T = unknown>(config: HYRequestConfig) {
    return this.request<T>({ ...config, method: "DELETE" })
  }
  patch<T = unknown>(config: HYRequestConfig) {
    return this.request<T>({ ...config, method: "PATCH" })
  }
  put<T = unknown>(config: HYRequestConfig) {
    return this.request<T>({ ...config, method: "PUT" })
  }
}

/**
 *
 * @param cancelFn 取消上一次请求
 * @returns new axios.CancelToken(cancelFn)
 */
const createCancelToken = (cancelFn: CancelRequest["create"]) => {
  return new axios.CancelToken(cancelFn)
}

export { createCancelToken, HYRequest }
