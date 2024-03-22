<script lang="ts" setup>
import type { DropData, DropMenuItem, DropMenuText, DropMenuValue } from "./types"

const props = defineProps<{
  config: DropMenuItem[]
  defaultData?: DropData
}>()

const dropData = defineModel<DropData>({ required: true })

watchEffect(getDropData)

function getDropData() {
  dropData.value = props.config.reduce(
    (acc, { name, options }) => ({
      ...acc,
      [name]: props.defaultData?.[name] ?? options[0]?.value,
    }),
    {} as DropData,
  )
}

function changeDropData(data: Record<DropMenuText, DropMenuValue>) {
  for (const key in data) {
    dropData.value[key] = data[key]
  }
  return dropData.value
}

defineExpose({ changeDropData })
</script>

<template>
  <van-dropdown-menu swipe-threshold="4">
    <template v-for="item in config" :key="item.title">
      <van-dropdown-item v-model="dropData[item.name]" :options="item.options" />
    </template>
  </van-dropdown-menu>
</template>
