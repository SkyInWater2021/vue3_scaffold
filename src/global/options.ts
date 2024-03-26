import { SelectOptions } from "@/utils/select-rich"

export const demoOption = new SelectOptions([
  {
    label: "我是测试label",
    value: "i`m test value",
    extra: { info: "error", number: 1 },
  },
])
