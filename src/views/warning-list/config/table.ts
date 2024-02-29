import { getTableConfig } from "@/global"

export const tableConfig = getTableConfig({
  showPagination: true,
  smallPagination: true,
  showBorder: true,
  propList: [
    { label: "系统名称", prop: "SYSTEM", width: 120 },
    { label: "事件标题", prop: "EVENT_TITLE", width: 150 },
    { label: "评论", prop: "KComment", showOverflowTooltip: false },
    { label: "建议", prop: "EVENT_SUGGEST", width: 200, showOverflowTooltip: false },
    { label: "发送者", prop: "sender", width: 120 },
    { label: "发生时间", prop: "occur_time", width: 180, columnSlotName: "occur_time" },
  ],
})
