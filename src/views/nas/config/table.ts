import { getTableConfig } from "@/global"

export const tableConfig = getTableConfig({
  showPagination: false,
  showBorder: true,
  propList: [
    { label: "工作目录", prop: "workDir" },
    { label: "NAS空间", prop: "workSpace" },
    { label: "用途", prop: "workNote" },
    { label: "Max iops", prop: "workMax" },
    { label: "workNote", prop: "workNote" },
    { label: "workName", prop: "workName" },
  ],
})
