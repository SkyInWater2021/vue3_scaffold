<script setup lang="ts">
import { zhCn } from "element-plus/es/locales.mjs"
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden">
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>
