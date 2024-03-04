import { PaginationEmits, PaginationProps } from "element-plus"
import { CSSProperties } from "vue"

import { EraseReadonly } from "./common"

// 分页器事件类型
type EmitEvents = Omit<PaginationEmits, "update:current-page" | "update:page-size">
export type PaginationEvents = Partial<{
  [K in keyof EmitEvents]: (...args: Parameters<EmitEvents[K]>) => void
}>

// 分页器属性类型
type NeedProps = EraseReadonly<PaginationProps>
export interface PaginationConfig extends Partial<NeedProps> {
  events?: PaginationEvents
  otherOptions?: { style?: Partial<CSSProperties> }
}
