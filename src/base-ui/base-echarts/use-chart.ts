import { echarts, ECOption } from "./echarts"
import { InitEchart } from "./types"

export function useChart(el: HTMLElement): InitEchart {
  if (!el) throw new Error("请传递echarts的DOM容器")

  const echartInstance = echarts.init(el, "dark")

  function setOptions(options: ECOption) {
    echartInstance.setOption(options, true)
  }

  function updateSize() {
    echartInstance.resize()
  }

  const resizeObserver = new ResizeObserver(() => updateSize())
  resizeObserver.observe(el)

  onUnmounted(() => {
    resizeObserver.disconnect()
    echartInstance.dispose()
  })

  return { echarts, echartInstance, setOptions, updateSize }
}
