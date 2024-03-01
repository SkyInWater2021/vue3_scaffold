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

export const FlumeTableQueueConfig = getTableConfig({
  showPagination: true,
  smallPagination: true,
  showBorder: true,
  propList: [
    {
      label: "队列名称",
      prop: "channelName",
      columnSlotName: "channelName",
      sortable: "custom",
    },
    { label: "节点名称", prop: "nodeName", sortable: "custom" },
    { label: "监控IP", prop: "monitorIp", sortable: "custom" },
    { label: "端口号", prop: "port", sortable: "custom" },
    { label: "监控时间", prop: "monitorTime", sortable: "custom" },
  ],
})

export const RMQTableQueueConfig = getTableConfig({
  showPagination: true,
  smallPagination: true,
  showBorder: true,
  propList: [
    {
      label: "队列名称",
      prop: "queueName",
      columnSlotName: "queueName",
      sortable: "custom",
    },
    { label: "主机Ip", prop: "hostIp", sortable: "custom" },
    { label: "端口号", prop: "port", sortable: "custom" },
    { label: "主机名称", prop: "hostName", sortable: "custom" },
    { label: "rmq名称", prop: "rmqName", sortable: "custom" },
  ],
})
