// 转成万为单位
export function numberToTenThousand(value: number, precision = 4) {
  if (value === undefined || value === null) return
  const result = value / 10000
  return Number(result.toFixed(precision))
}

// 每隔三位添加一个逗号
export function addCommasToNumber(number: number) {
  if (number === undefined || number === null) return
  const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return formattedNumber
}

// 转换文件大小
export const fileSizeUnits = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
export function formatFileSize(
  fileSize: number | undefined | null,
  precision = 0,
  option?: { form?: string; toUnitIndex?: number },
) {
  if (fileSize === undefined || fileSize === null) return

  const formUnitIndex = fileSizeUnits.findIndex(item => item === option?.form)

  // 统一先转为Byte
  let size = fileSize * Math.pow(1024, formUnitIndex === -1 ? 0 : formUnitIndex)
  let unitIndex = 0

  const limitIndex = option?.toUnitIndex ?? fileSizeUnits.length - 1
  while (size >= 1024 && unitIndex < limitIndex) {
    size /= 1024
    unitIndex++
  }

  const formattedSize = Number(size).toFixed(precision)
  const unit = fileSizeUnits[unitIndex]

  return {
    value: Number(formattedSize),
    unit: unit,
    fullValue: `${formattedSize} ${unit}`,
    currentUnitIndex: unitIndex,
  }
}
