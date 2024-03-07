<script setup lang="ts">
import { Locale } from "vant"
import zhCN from "vant/es/locale/lang/zh-CN"

Locale.use("zh-CN", zhCN)
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.title === '首页' ? 'slide-right' : 'slide-left'">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  position: absolute;
  inset: 0;
  transition: all 1s;
  will-change: transform;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
