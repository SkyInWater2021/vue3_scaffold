import { formatFileSize } from "@/utils"

export function useBaseChart() {
  // * ===== 单位转换 =====
  function changeDataToUnit(value: number | undefined | null, maxValue: number, unit: string) {
    if (value === undefined || value === null) return value

    const unitStr = unit.toUpperCase()

    const { value: maxVal, currentUnitIndex } = formatFileSize(maxValue) ?? {
      currentUnitIndex: 0,
      value: 0,
    }

    const formatRes = formatFileSize(value, 2, {
      form: unitStr,
      toUnitIndex: Math.max(maxVal > 20 ? currentUnitIndex : currentUnitIndex - 1, 0),
    })

    const space = Math.max(String(formatRes?.value ?? 0).length * 8, 40)

    return { ...formatRes, space }
  }

  // * ==== 获取图标坐标轴宽度 =====
  function getAxisMax(data: Array<number | undefined | null>) {
    const maxValue = String(Math.max(...(data.filter(Boolean) as number[]), 0))
    return { space: Math.max(maxValue.length * 8, 40), max: Number(maxValue) }
  }

  return {
    changeDataToUnit,
    getAxisMax,
  }
}
