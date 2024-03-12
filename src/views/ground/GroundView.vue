<script lang="ts" setup>
import { PageHeader } from "@/components"

import GroundMap from "./GroundMap.vue"
import MapFactor from "./MapFactor.vue"
import MapSizer from "./MapSizer.vue"

const factorInstance = ref<InstanceType<typeof MapFactor>>()

const isCheckFactor = ref(false)
const changeFactorCheck = () => (isCheckFactor.value = !isCheckFactor.value)

const activeFactors = computed(() => factorInstance.value?.activeFactors ?? [])
</script>

<template>
  <div class="flex h-full flex-col">
    <PageHeader title="地面">
      <template #right>
        <div class="flex items-center justify-end">
          <van-icon name="photo-o" size="24" class="mr-2" />
          <van-icon
            size="24"
            name="list-switching"
            :color="isCheckFactor ? '#eb6642' : ''"
            @click="changeFactorCheck"
          />
        </div>
      </template>
    </PageHeader>

    <MapSizer />

    <div class="relative flex-1">
      <GroundMap :factors="activeFactors" />

      <MapFactor v-show="isCheckFactor" ref="factorInstance" />
    </div>
  </div>
</template>
