import { echarts } from ".."
import darkTheme from "../theme/dark-theme.json"

import type { InitEchart } from "../types"

export function useEchart(el: HTMLElement): InitEchart {
  if (!el) new Error("请传入echarts的DOM容器")

  echarts.registerTheme("dark", darkTheme)
  const echartInstance = echarts.init(el, "dark")

  function setOptions(options: echarts.EChartsOption) {
    echartInstance.setOption(options, true)
  }

  function updateSize() {
    echartInstance.resize()
  }

  const resizeObserver = new ResizeObserver(() => updateSize())
  resizeObserver.observe(el)

  onMounted(() => resizeObserver.disconnect())

  return { echarts, echartInstance, setOptions, updateSize }
}
