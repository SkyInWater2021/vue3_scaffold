import { getTableConfig } from "@/global"

export const singleCodeTableConfig = getTableConfig({
  showPagination: false,
  showBorder: true,
  propList: [
    {
      label: "",
      prop: "date",
      minWidth: 100,
      columnSlotName: "type",
    },
  ],
})
