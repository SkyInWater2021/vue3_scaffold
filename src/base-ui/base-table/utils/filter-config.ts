import type { PaginationConfig } from "../types/pagination"
import type { TableConfig, TableItemConfig } from "../types/table"

/**
 * AIM: 筛选列表需要绑定的属性
 * @param config 列表配置对象
 * @returns 返回需要绑定的属性的对象
 */
export const filterTableConfig = (config: TableConfig) => {
  const nature: TableConfig = { ...config }
  const needFilterNature = ["events", "propList"]
  changeProperty<TableConfig>(nature, needFilterNature)
  return nature
}

/**
 * AIM: 筛选需要绑定的类表项属性
 * @param propItem 列表项配置对象
 * @returns 需要绑定的列表项属性对象
 */
export const filterTableItemConfig = (propItem: TableItemConfig) => {
  const nature: TableItemConfig = { ...propItem }
  const needFilterNature = ["otherOptions"]
  changeProperty<TableItemConfig>(nature, needFilterNature)
  return nature
}

/**
 * AIM: 筛选掉需要绑定的分页器属性
 * @param config 分页器配置对象
 * @returns 需要绑定的分页器属性对象
 */
export const filterPaginationConfig = (config: PaginationConfig) => {
  const nature: PaginationConfig = { ...config }

  const needFilter = ["total", "pageSize", "currentPage", "events", "otherOptions"]
  changeProperty<PaginationConfig>(nature, needFilter)
  return nature
}

/**
 * 删除不需要绑定的对象
 * @param obj - 绑定的对象
 * @param PropertyName - 需要删除的属性
 */
const changeProperty = <T>(obj: T, PropertyName: string | string[]): void => {
  const names = Array.isArray(PropertyName) ? [...PropertyName] : [PropertyName]
  names.forEach(key => {
    Object.defineProperty(obj, key, {
      value: null,
      configurable: false,
      enumerable: false,
      writable: false,
    })
  })
}
