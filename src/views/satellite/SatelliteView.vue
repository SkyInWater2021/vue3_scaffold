<script lang="ts" setup>
import { PageHeader } from "@/components"

import SatelliteMap from "./SatelliteMap.vue"
</script>

<template>
  <div class="flex h-full flex-col">
    <PageHeader title="卫星云图" />

    <div class="flex-1">
      <SatelliteMap />
    </div>
  </div>
</template>
