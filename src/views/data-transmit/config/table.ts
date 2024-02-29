import { getTableConfig } from "@/global"

export const colTableConfig = getTableConfig({
  showPagination: true,
  smallPagination: true,
  showBorder: true,
  propList: [
    { label: "用户名", prop: "USER_ID_NAME", columnSlotName: "userName" },
    { label: "文件数量", prop: "FILE_COUNT", columnSlotName: "fileCount" },
    { label: "文件大小", prop: "FILESIZE_COUNT", columnSlotName: "fileSizeCount" },
  ],
})

export const distTableConfig = getTableConfig({
  showPagination: true,
  smallPagination: true,
  showBorder: true,
  propList: [
    { label: "一级编码", prop: "DATA_TYPE_FIRST" },
    { label: "一级编码名称", prop: "DATA_TYPE_FIRST_NAME" },
    { label: "文件数量(个)", prop: "FILE_COUNT", columnSlotName: "fileCount" },
    { label: "文件大小", prop: "FILESIZE_COUNT", columnSlotName: "fileSizeCount" },
  ],
})

export const distTableExpandConfig = getTableConfig({
  showPagination: false,
  showBorder: true,
  propList: [
    { label: "用户名", prop: "USER_ID_NAME", columnSlotName: "userName" },
    { label: "文件数量", prop: "FILE_COUNT", columnSlotName: "fileCount" },
    { label: "文件大小", prop: "FILESIZE_COUNT", columnSlotName: "fileSizeCount" },
  ],
})
