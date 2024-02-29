<script lang="ts" setup>
import { onMounted, ref } from "vue"

import { filterTableConfig, filterTableItemConfig } from "../utils/filter-config"

import type { TableConfig, TableData } from "../types/table"
import type { TableInstance } from "element-plus"

defineProps<{ tableConfig: TableConfig; tableData?: TableData }>()

const emit = defineEmits<{
  completed: [instance: TableInstance]
}>()

const tableRef = ref<TableInstance | null>(null)
onMounted(() => emit("completed", tableRef.value!))
</script>

<template>
  <div style="width: 100%">
    <slot name="header" />

    <el-table
      ref="tableRef"
      v-bind="filterTableConfig(tableConfig)"
      :data="tableData ?? []"
      v-on="tableConfig.events ?? {}"
    >
      <template v-for="propItem in tableConfig.propList" :key="propItem.prop">
        <el-table-column
          v-if="!propItem.otherOptions?.hidden"
          v-bind="filterTableItemConfig(propItem)"
        >
          <template v-if="!propItem.type || propItem.type === 'expand'" #default="scope">
            <slot :name="propItem.columnSlotName" :row="scope.row">
              {{ scope?.row[propItem.prop ?? ""] }}

              <template v-if="scope?.row[propItem.prop ?? '']">
                {{ propItem.otherOptions?.unit ?? "" }}
              </template>
            </slot>
          </template>

          <template v-if="propItem.headerSlotName" #header="slotProps">
            <slot :name="propItem.headerSlotName" v-bind="slotProps"></slot>
          </template>
        </el-table-column>
      </template>

      <template #empty><slot name="empty" /></template>
      <template #append><slot name="append" /></template>
    </el-table>

    <slot name="footer"></slot>
  </div>
</template>
