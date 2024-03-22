<script lang="ts" setup>
defineProps<{ loading: boolean }>()
</script>

<template>
  <van-overlay :show="loading" z-index="99" style="--van-overlay-background: #0002">
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="flex h-[100px] w-[100px] items-center justify-center rounded-2xl bg-white">
        <van-loading type="spinner" size="24" vertical color="#5983ef"> 加载中... </van-loading>
      </div>
    </div>
  </van-overlay>
</template>
