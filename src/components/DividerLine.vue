<script lang="ts" setup>
defineProps<{
  vertical?: boolean
}>()
</script>

<template>
  <div v-if="vertical" class="mx-[1px] h-full w-[2px] bg-pewter"></div>
  <div v-else class="my-[1px] h-[2px] bg-pewter"></div>
</template>
