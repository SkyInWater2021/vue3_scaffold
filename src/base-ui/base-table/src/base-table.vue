<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue"

import TableMain from "./table-main.vue"
import TablePagination from "./table-pagination.vue"

import type { BaseTableConfig, TableData, TableItemConfig } from "../types/table"
import type { TableInstance } from "element-plus"

// 组件接收属性
const props = defineProps<{
  config: BaseTableConfig
  data?: TableData
  count?: number
}>()

// 自定义事件
const emit = defineEmits<{
  completed: [Instance: TableInstance]
}>()

// 设置组件实例
const tableInstance = ref<TableInstance | null>(null)
const getTableInstance = (instance: TableInstance) => (tableInstance.value = instance)

// 获取需要自定义的插槽
const slotItems: TableItemConfig[] = []
const slotItemsHeader: TableItemConfig[] = []
watchEffect(() => {
  const { propList } = props.config.tableConfig
  slotItems.length = 0
  slotItemsHeader.length = 0
  propList.forEach(item => {
    if (item.columnSlotName) slotItems.push(item)
    if (item.headerSlotName) slotItemsHeader.push(item)
  })
})

// 分页器相关操作
const currentPage = ref(props.config.paginationConfig?.currentPage ?? 1)
const pageSize = ref(props.config.paginationConfig?.pageSize ?? 10)
defineExpose({ currentPage, pageSize })

onMounted(() => emit("completed", tableInstance.value!))
</script>

<template>
  <TableMain
    :table-config="config.tableConfig"
    :table-data="data ?? []"
    @completed="getTableInstance"
  >
    <template #header><slot name="header" /></template>
    <template #empty><slot name="empty" /></template>
    <template #append><slot name="append" /></template>

    <template
      v-for="propItem in slotItems"
      :key="propItem.prop"
      #[propItem.columnSlotName!]="scope"
    >
      <slot :name="propItem.columnSlotName" v-bind="scope.row" />
    </template>

    <template
      v-for="propItem in slotItemsHeader"
      :key="propItem.prop"
      #[propItem.headerSlotName!]="slotProps"
    >
      <slot :name="propItem.headerSlotName" v-bind="slotProps" />
    </template>

    <template #footer>
      <div v-if="config.paginationConfig" :style="config.paginationConfig?.otherOptions?.style">
        <TablePagination
          v-model:currentPage="currentPage"
          v-model:pageSize="pageSize"
          :config="config.paginationConfig"
          :total="count ?? 0"
        />
      </div>
      <slot name="footer" />
    </template>
  </TableMain>
</template>
