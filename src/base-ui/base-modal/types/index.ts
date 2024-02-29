import type { DialogEmits, DialogProps } from "element-plus"
import type { CSSProperties } from "vue"

// 从类型T中移除readonly修饰符
type EraseReadonly<T> = {
  -readonly [P in keyof T]: T[P]
}

// 从DialogEmits中排除'update:modelValue'事件
type EmitEvents = Omit<DialogEmits, "update:modelValue">

// 移除readonly修饰符后的DialogProps类型
type NeedProps = EraseReadonly<DialogProps>

// 使用Mapped Types将每个事件的参数类型改为void
export type ModalEvents = Partial<{
  [K in keyof EmitEvents]: (...args: Parameters<EmitEvents[K]>) => void
}>

// ModalConfig类型定义优化
export interface ModalConfig extends Partial<NeedProps> {
  showHeader?: boolean
  showFooter?: boolean
  minWidth?: string
  maxWidth?: string
  headerStyle?: CSSProperties
}
