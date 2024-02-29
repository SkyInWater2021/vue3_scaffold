import { getTableConfig } from "@/global"

export const tableConfig = getTableConfig({
  showPagination: true,
  smallPagination: true,
  showBorder: true,
  propList: [
    {
      label: "四级编码",
      prop: "type",
      minWidth: 120,
      columnSlotName: "type",
    },
    {
      label: "趋势图",
      minWidth: 100,
      prop: "tendency",
    },
  ],
})
