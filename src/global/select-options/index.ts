import { SelectOptions } from "./select-option"

// 消息主机配置管理 - 实例类型
export const hostInstanceTypeOptions = new SelectOptions([
  { label: "全部", value: 0 },
  { label: "传输实例", value: 1 },
  { label: "服务实例", value: 2 },
])
