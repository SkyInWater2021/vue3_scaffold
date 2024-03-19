<script lang="ts" setup>
defineProps<{
  loading: boolean
}>()
</script>

<template>
  <van-overlay :show="loading" z-index="99" style="--van-overlay-background: #fff5">
    <div class="absolute inset-0 flex items-center justify-center">
      <van-loading type="spinner" size="24" vertical color="#5983ef"> 加载中... </van-loading>
    </div>
  </van-overlay>
</template>
