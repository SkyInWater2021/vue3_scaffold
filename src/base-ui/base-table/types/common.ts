/** 擦除类型中的只读属性 */
export type EraseReadonly<T> = {
  -readonly [P in keyof T]: T[P]
}
