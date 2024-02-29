import type { BaseTableConfig, PaginationConfig, TableConfig, TableItemConfig } from "@/base-ui"

import type { CSSProperties } from "vue"

const tableHeaderStyle: Partial<CSSProperties> = {
  fontSize: "14px",
  fontWeight: 600,
  height: "50px",
  color: "white",
  background: "transparent",
}

const tableCellStyle: Partial<CSSProperties> = {
  fontSize: "14px",
  fontWeight: 400,
  height: "50px",
  background: "transparent",
}

/**
 * 获取分页器配置
 * @returns 分页器 config 配置对象
 */
const getPaginationConfig = ({ small = false, pageSize = 10 }) => {
  return {
    small,
    pageSize,
    background: false,
    pageSizes: [10, 20, 30, 50],
    layout: "total, sizes, prev, pager, next, jumper",
    otherOptions: {
      style: { display: "flex", justifyContent: "right", padding: "10px 20px 0 0 " },
    },
  } as Partial<PaginationConfig>
}

/**
 * 获取部分表格配置项配置
 * @param options
 * @param options.height 列表固定高度
 * @param options.maxHeight 列表最高高度
 * @param options.propList 列表项配置
 * @returns 对应的 config 对象
 */
export const getTableConfig = (options: {
  propList: TableItemConfig[]
  headerStyle?: Partial<CSSProperties>
  cellStyle?: Partial<CSSProperties>
  height?: string
  maxHeight?: string
  showIndex?: boolean
  showSelection?: boolean
  showExpand?: boolean
  showPagination?: boolean
  showBorder?: boolean
  showStripe?: boolean
  smallPagination?: boolean
  pageSize?: number
  highlightCurrentRow?: boolean
  events?: TableConfig["events"]
  showHeader?: boolean
  tableLayout?: "fixed" | "auto"
  fit?: boolean
  size?: "large" | "default" | "small"
  // TODO 继续添加需要的类型
  // ...
}) => {
  const baseTableConfig: BaseTableConfig = {
    tableConfig: {
      headerRowClassName: "com-floodlit-box",
      cellClassName: "com-floodlit-box",
      headerCellStyle: {
        ...tableHeaderStyle,
        ...options.headerStyle,
      },
      cellStyle: {
        ...tableCellStyle,
        ...options.cellStyle,
      },
      stripe: options.showStripe,
      border: options.showBorder,
      height: options.height,
      maxHeight: options.maxHeight,
      propList: options.propList,
    },
  }

  if (options.showIndex) {
    baseTableConfig.tableConfig.propList.unshift({
      label: "序号",
      type: "index",
      width: "60px",
      align: "center",
    })
  }

  if (options.showSelection) {
    baseTableConfig.tableConfig.propList.unshift({
      type: "selection",
      width: "55px",
      align: "left",
    })
  }

  if (options.showPagination !== false) {
    baseTableConfig.paginationConfig = getPaginationConfig({
      small: options.smallPagination ?? false,
      pageSize: options.pageSize,
    })
  }

  baseTableConfig.tableConfig.propList.forEach(item => {
    if (!item.align) item.align = "center"
    if (item.showOverflowTooltip !== false) item.showOverflowTooltip = true
  })

  baseTableConfig.tableConfig.events = options.events
  baseTableConfig.tableConfig.highlightCurrentRow = options.highlightCurrentRow
  baseTableConfig.tableConfig.showHeader = options.showHeader
  baseTableConfig.tableConfig.tableLayout = options.tableLayout
  baseTableConfig.tableConfig.fit = options.fit
  baseTableConfig.tableConfig.size = options.size

  return baseTableConfig
}
