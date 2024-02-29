import { getTableConfig } from "@/global"

export const tableConfig = getTableConfig({
  showPagination: false,
  showBorder: true,
  propList: [
    { label: "主机IP", prop: "hostIp", columnSlotName: "hostIp" },
    { label: "主机名称", prop: "hostName" },
    { label: "进程名称", prop: "processName" },
    { label: "最大进程", prop: "maxProcess" },
    { label: "最大线程", prop: "maxThread" },
    { label: "类型", prop: "type", columnSlotName: "type" },
  ],
})
