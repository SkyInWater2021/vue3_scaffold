// 转成万为单位
export function numberToTenThousand(value?: number, precision = 4): number | undefined {
  if (value === undefined || value === null) return undefined
  return Number((value / 10000).toFixed(precision))
}

// 每隔三位添加一个逗号
export function addCommasToNumber(number?: number): string | undefined {
  if (number === undefined || number === null) return undefined
  return number.toLocaleString()
}

export const fileSizeUnits = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] as const

// 格式化文件大小
export function formatFileSize(
  fileSize?: number,
  precision = 0,
  option?: {
    fromUnit: (typeof fileSizeUnits)[number]
    to: (typeof fileSizeUnits)[number]
  },
): string | undefined {
  if (fileSize === undefined || fileSize === null || fileSize < 0) return undefined

  const fromUnitIndex = Math.max(fileSizeUnits.indexOf(option?.fromUnit ?? "B"), 0)
  const toUnitIndex = Math.max(
    fileSizeUnits.indexOf(option?.to ?? fileSizeUnits[fromUnitIndex]),
    fromUnitIndex,
  )

  let sizeInBytes = fileSize * Math.pow(1024, fromUnitIndex)
  let targetUnitIndex = fromUnitIndex

  // 确保转换至正确的单位
  while (sizeInBytes >= 1024 && targetUnitIndex < toUnitIndex) {
    sizeInBytes /= 1024
    targetUnitIndex++
  }

  const formattedSize = sizeInBytes.toFixed(precision)
  const unit = fileSizeUnits[targetUnitIndex]

  return `${formattedSize} ${unit}`
}
