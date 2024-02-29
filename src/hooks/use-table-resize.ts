import { BaseTableConfig } from "@/base-ui"

export function useTableResizeObserver(
  el: Ref<HTMLElement | undefined>,
  config: BaseTableConfig,
  offset = 35,
) {
  const getTableHeight = () => {
    const targetHeight = el.value?.clientHeight ?? 100
    config.tableConfig.height = targetHeight - offset
  }
  const resizeObserver = new ResizeObserver(getTableHeight)

  onMounted(() => resizeObserver.observe(el.value!))
  onUnmounted(() => resizeObserver.disconnect())
}
