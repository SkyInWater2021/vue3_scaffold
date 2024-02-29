<script lang="ts" setup>
import { filterPaginationConfig } from "../utils/filter-config"

import type { PaginationConfig } from "../types/pagination"

type ModelEvent = "update:currentPage" | "update:pageSize"

defineProps<{
  config: PaginationConfig
  total: number
  currentPage: number
  pageSize: number
}>()

const emit = defineEmits<{ (prop: ModelEvent, number: number): void }>()
const handleUpdate = (number: number, prop: ModelEvent) => emit(prop, number)
</script>

<template>
  <el-pagination
    ref="paginationRef"
    :total="total"
    :page-size="pageSize"
    :current-page="currentPage"
    v-bind="filterPaginationConfig(config)"
    v-on="config.events ?? {}"
    @update:current-page="handleUpdate($event, 'update:currentPage')"
    @update:page-size="handleUpdate($event, 'update:pageSize')"
  />
</template>
