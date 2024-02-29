import { ElLoading, ElMessage, type LoadingOptions } from "element-plus"
import "element-plus/es/components/message-box/style/css"
import "element-plus/es/components/message/style/css"

type MessageType = "success" | "error" | "warning" | "info"
/**
 * AIM: 自定义提示信息
 * @param {string} message 提示信息
 * @param {string} type 提示类型 success || error || warning || info
 */
export const showElMessage = (message: string, type: MessageType = "success", offset?: number) => {
  ElMessage[type]({
    message: message,
    center: true,
    offset: offset ?? 100,
    grouping: true,
    duration: 1500,
  })
}

/**
 * 页面加载
 * @param options
 * @returns
 */
export const showElLoading = (options: LoadingOptions) => {
  const instance = ElLoading.service(options)
  return instance
}
