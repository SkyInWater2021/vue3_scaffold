import { getTableConfig } from "@/global"

export const totalTableConfig = getTableConfig({
  showPagination: true,
  smallPagination: true,
  showBorder: true,
  propList: [
    {
      label: "四级编码",
      prop: "DATA_TYPE",
      width: 180,
      columnSlotName: "dataType",
    },
    {
      label: "四级编码名称",
      prop: "DATA_TYPE_NAME",
    },
    {
      label: "总量",
      minWidth: 100,
      prop: "FILESIZE_COUNT",
      columnSlotName: "total",
    },
    {
      label: "平均量",
      minWidth: 100,
      prop: "FILESIZE_AVG",
      columnSlotName: "avg",
    },
  ],
})
