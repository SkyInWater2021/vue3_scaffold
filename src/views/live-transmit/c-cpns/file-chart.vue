<script lang="ts" setup>
import { ShineCard } from "@/components"

import { cpnsMap } from "../config"

import BaseChart from "./base-chart.vue"
</script>

<template>
  <div class="flex h-full flex-wrap justify-between">
    <ShineCard
      v-for="item in cpnsMap.fileChart"
      :key="item.title"
      :class="item.class"
      class="card-item"
    >
      <BaseChart ref="chartRef" :title="item.title" :api="item.api" :chart="item.cpn" />
    </ShineCard>
  </div>
</template>

<style scoped>
.card-item {
  width: calc(50% - 10px);
}
</style>
