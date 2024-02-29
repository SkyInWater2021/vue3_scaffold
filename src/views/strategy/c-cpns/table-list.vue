<script lang="ts" setup>
import { BaseTable } from "@/base-ui"
import { ContentTitle, FetchTime } from "@/components"
import { getTableConfig, typeOptions } from "@/global"
import { useTableResizeObserver } from "@/hooks"
import { strategyApi } from "@/services"
import type { ListItemResponse } from "@/services/strategy/types"
import { dateOffset, formatDate } from "@/utils"

const currentType = ref(typeOptions.options[0].value)

const tableContainerRef = ref<HTMLDivElement>()
const tableRef = ref<InstanceType<typeof BaseTable>>()

const tableData = ref<ListItemResponse[]>([])
const tableTotal = ref(0)
const tableLoading = ref(false)
const fetchTime = ref<string>()

const additionalProps = {
  "1": [
    { label: "资料类型数量", prop: "dataTypeNum" },
    { label: "数据源数量", prop: "dataSourceNum" },
  ],
  "2": [{ label: "资料类型数量", prop: "dataTypeNum" }],
  "3": [{ label: "算法引用次数", prop: "algorithmUsedTimes" }],
  "4": [
    { label: "资料种类数量", prop: "dataTypeNum" },
    { label: "数据源数量", prop: "dataSourceNum" },
  ],
}

const tableConfig = computed(() => {
  return getTableConfig({
    showPagination: false,
    showBorder: true,
    propList: [
      { label: "名称", prop: "name" },
      { label: "类型", prop: "type" },
      ...additionalProps[currentType.value as keyof typeof additionalProps],
    ],
  })
})

async function fetchListData() {
  if (!tableRef.value) return

  tableLoading.value = true

  strategyApi
    .queryThirdStrategyList({ type: currentType.value as string })
    .then(res => {
      if (res?.code === 200) {
        tableData.value = res?.data ?? []
        tableTotal.value = res?.total ?? 0
        fetchTime.value = dateOffset({ offset: -8, format: "HH:mm:ss" })
      }
    })
    .catch(error => console.error(error))
    .finally(() => (tableLoading.value = false))
}

// ===== 获取列表高度 =====
useTableResizeObserver(tableContainerRef, tableConfig.value, 40)

onMounted(() => fetchListData())
</script>

<template>
  <div class="flex h-full flex-col">
    <ContentTitle>
      <div class="flex h-full items-center justify-between">
        <el-radio-group v-model="currentType" class="mr-2.5" @change="fetchListData">
          <el-radio v-for="option in typeOptions.options" :key="option.label" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>

        <FetchTime :loading="tableLoading" :time="fetchTime" @refresh="fetchListData" />
      </div>
    </ContentTitle>

    <div ref="tableContainerRef" v-loading="tableLoading" class="flex-1">
      <BaseTable ref="tableRef" :config="tableConfig" :data="tableData" :count="tableTotal">
        <template #occur_time="scope">
          {{ formatDate(scope.occur_time) }}
        </template>
      </BaseTable>
    </div>
  </div>
</template>
