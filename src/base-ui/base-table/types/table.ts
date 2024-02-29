import type { EraseReadonly } from "./common"
import type { PaginationConfig } from "./pagination"
import type { TableColumnInstance, TableInstance } from "element-plus"

// 事件类型
type EmitEvent = TableInstance["$emit"]
type EventType = Parameters<EmitEvent>[0]

export type TableEvents = Partial<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in EventType]: (...args: any[]) => void
}>

// tableConfig 类型
type NeedTableProps = EraseReadonly<TableInstance["$props"]>

export interface TableConfig extends Partial<NeedTableProps> {
  events?: TableEvents
  propList: TableItemConfig[]
}

// tableItem类型
type NeedTableItemProps = EraseReadonly<TableColumnInstance["$props"]>
export interface TableItemConfig extends Partial<NeedTableItemProps> {
  columnSlotName?: string
  headerSlotName?: string
  otherOptions?: { unit?: string; hidden?: boolean }
}

export interface BaseTableConfig {
  tableConfig: TableConfig
  paginationConfig?: PaginationConfig
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableData<T = any> = Record<string | number, T>[]
