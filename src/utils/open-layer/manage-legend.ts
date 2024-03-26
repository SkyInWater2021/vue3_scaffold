interface ColorMapItem {
  start: number
  end: number
  color: string
}
interface SliderItem {
  label: string
  color: string
  start: number
  end: number
}

export class ManageLegend {
  private colorMap: Map<RegExp[], ColorMapItem[]> = new Map()

  constructor() {
    this.colorMap.set(
      [/气温|温度|TEM/],
      [
        { start: -50, end: -30, color: "#040c60" },
        { start: -30, end: -28, color: "#0d1d73" },
        { start: -28, end: -26, color: "#1a3086" },
        { start: -26, end: -24, color: "#264399" },
        { start: -24, end: -22, color: "#3356ad" },
        { start: -22, end: -20, color: "#3f69c1" },
        { start: -20, end: -18, color: "#4c7bd4" },
        { start: -18, end: -16, color: "#5c88d7" },
        { start: -16, end: -14, color: "#6d95da" },
        { start: -14, end: -12, color: "#7ea2dd" },
        { start: -12, end: -10, color: "#8faee0" },
        { start: -10, end: -8, color: "#a1bbe4" },
        { start: -8, end: -6, color: "#99b8cd" },
        { start: -6, end: -4, color: "#a5cccf" },
        { start: -4, end: -2, color: "#a5d4c4" },
        { start: -2, end: 0, color: "#a9e6b2" },
        { start: 0, end: 2, color: "#d8de89" },
        { start: 2, end: 4, color: "#e7dc7f" },
        { start: 4, end: 6, color: "#f0da75" },
        { start: 6, end: 8, color: "#f3ce65" },
        { start: 8, end: 10, color: "#edb74c" },
        { start: 10, end: 12, color: "#e69f38" },
        { start: 12, end: 14, color: "#e49736" },
        { start: 14, end: 16, color: "#e28a34" },
        { start: 16, end: 18, color: "#df7c33" },
        { start: 18, end: 20, color: "#dd6d32" },
        { start: 20, end: 22, color: "#dd6234" },
        { start: 22, end: 24, color: "#d6572f" },
        { start: 24, end: 26, color: "#cf4c2a" },
        { start: 26, end: 28, color: "#c84226" },
        { start: 28, end: 30, color: "#bf3722" },
        { start: 30, end: 32, color: "#b2241a" },
        { start: 32, end: 34, color: "#a6221a" },
        { start: 34, end: 35, color: "#9b1f1c" },
        { start: 35, end: 37, color: "#7e191e" },
        { start: 37, end: 40, color: "#651019" },
        { start: 40, end: 50, color: "#490911" },
      ],
    )
  }

  /**
   * 获取图例配置信息
   * @param targetString 映射键中包含的字符串
   * @returns 图例配置
   */
  getLegendColorMap(targetString = "") {
    if (!targetString) return []
    const mapKey = this.getTargetColorMapKey(targetString) ?? []
    const colorInfo = this.colorMap.get(mapKey) ?? []

    const sliderData: SliderItem[] = []
    colorInfo.forEach(item => {
      // 定义开始为0的话,0某些情况不会显示在地图中,所以定义一个极小值,用于显示0
      const label = item.start === 0.01 ? "0" : String(item.start)
      sliderData.push({ label, color: item.color, start: item.start, end: item.end })
    })
    return sliderData
  }

  /**
   * 使用二分法查找包含该值的区间
   * @param val 需要查找的值
   * @param targetString 映射键中包含的字符串
   * @returns 查找到的区间项
   */
  findInterval(val: number, targetString: string): ColorMapItem | undefined {
    const mapKey = this.getTargetColorMapKey(targetString) ?? []
    const colorInfo = this.colorMap.get(mapKey) ?? []
    let left = 0
    let right = colorInfo.length - 1
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (val < colorInfo[mid].start) right = mid - 1
      else if (val >= colorInfo[mid].end) left = mid + 1
      else return colorInfo[mid]
    }

    return
  }

  /**
   * 获取当前当前字符串所在的mapKey
   * @param targetString 目标字符串
   * @returns 字符串所在的key值(key值为string[]类型)
   */
  getTargetColorMapKey(targetString: string) {
    if (!targetString) return
    let matchingKey: RegExp[] | undefined
    this.colorMap.forEach((_, key) => {
      if (key.some(keyString => keyString.test(targetString))) {
        matchingKey = key
        return // 如果找到匹配的键，就停止遍历
      }
    })

    return matchingKey
  }

  // 将十六进制颜色加上透明度
  static hexToRgba(hex: string, alpha: number) {
    // 将十六进制颜色代码转换为RGB值
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    // 将透明度值转换为0到255之间的整数
    const a = Math.round(alpha * 255)

    // 返回RGBA颜色值
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
}
