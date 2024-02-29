import { SelectOptions } from "./select-option"

// 消息主机配置管理 - 实例类型
export const hostInstanceTypeOptions = new SelectOptions([
  { label: "全部", value: 0 },
  { label: "传输实例", value: 1 },
  { label: "服务实例", value: 2 },
])

export const typeOptions = new SelectOptions([
  { label: "接入", value: 1 },
  { label: "收集", value: 2 },
  { label: "处理", value: 3 },
  { label: "分发", value: 4 },
])
