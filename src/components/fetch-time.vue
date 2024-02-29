<script lang="ts" setup>
defineProps<{
  time: string | undefined
  loading: boolean
  width?: string
}>()

const emit = defineEmits<{ refresh: [] }>()
</script>

<template>
  <div class="ml-2.5 flex w-[150px] items-center justify-end text-xs" :style="{ width }">
    <span v-if="time" class="mr-2.5">刷新时间: {{ time }}</span>
    <IconEpRefresh :disabled="loading" @click="emit('refresh')" class="cursor-pointer" />
    <slot />
  </div>
</template>
