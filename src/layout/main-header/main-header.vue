<script lang="ts" setup>
import { RealTime } from "@/components"

const title = "国内气象通信系统CTS3"
</script>

<template>
  <div class="relative flex items-center justify-center">
    <div class="text-linear absolute left-16"><RealTime /></div>
    <div class="text-linear text-center text-2xl">{{ title }}</div>
  </div>
</template>
