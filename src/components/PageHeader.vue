<script lang="ts" setup>
defineProps<{ title?: string }>()

const router = useRouter()
</script>

<template>
  <div class="flex items-center justify-center bg-headerBg p-2.5 text-base text-white">
    <div class="w-[30%] text-left">
      <slot name="left">
        <van-icon name="arrow-left" size="22" @click="router.back" />
      </slot>
    </div>

    <div class="flex-1 text-center">
      <slot name="center">{{ title }}</slot>
    </div>

    <div class="w-[30%] text-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
