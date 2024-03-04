import { HYRequest } from "@/utils/request"

const requestInstance = new HYRequest({})

export const typeMapping: Record<string, string> = {
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xls: "application/vnd.ms-excel",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  doc: "application/msword",
  pdf: "application/pdf",
  default: "text/plain", // 默认的MIME类型
}

export function fetchFileByUrl(
  url: string,
  fileName: string,
  callback?: (response: BlobPart) => void,
) {
  requestInstance
    .request<BlobPart>({ method: "get", url, responseType: "blob" })
    .then(response => {
      callback ? callback(response) : downloadFile(response, fileName)
    })
    .catch(error => {
      console.error("Error fetching file:", error)
    })
}

export function downloadFile(file: BlobPart, fileName: string = "未知文件", callback?: () => void) {
  try {
    const urlObject = window.URL || window.webkitURL || window
    const fileType = fileName.split(".").pop() || "default"
    const blob = new Blob([file], {
      type: typeMapping[fileType.toLowerCase()] || typeMapping.default,
    })
    const downloadUrl = urlObject.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    urlObject.revokeObjectURL(downloadUrl)

    if (callback) callback()
  } catch (error) {
    console.error("Error downloading file:", error)
  }
}
