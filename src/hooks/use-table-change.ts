import type { BaseTableConfig } from "@/base-ui"

/**
 * 改变列的显示状态
 * @param config 列表
 * @param operationArr 需要操作的列,如果不传则默认设置为全部列显示
 * @param isHide 是否隐藏,默认值为 false
 */
export const useTableChange = (
  config: BaseTableConfig,
  operationArr: string[] = [],
  isHide = false,
) => {
  const propList = config.tableConfig.propList

  // 如果没有隐藏的列表项,则将列表项全部改为显示
  if (operationArr.length === 0) {
    propList.forEach(item => {
      item.otherOptions = {
        ...item.otherOptions,
        hidden: false,
      }
    })
    return
  }

  propList.forEach(listItem => {
    const flag = operationArr.includes(listItem.prop ?? "")
    listItem.otherOptions = {
      ...listItem.otherOptions,
      hidden: flag ? isHide : !isHide,
    }
  })
}
