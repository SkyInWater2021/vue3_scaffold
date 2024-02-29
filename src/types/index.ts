export interface GlobalSelectOption<T = string | number> {
  label: string
  value: T
}

export interface GlobalResponse<T = unknown> {
  code: number
  msg: string
  data: T
  total: number
}
