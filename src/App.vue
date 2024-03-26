<script setup lang="ts">
import { Locale } from "vant"
import zhCN from "vant/es/locale/lang/zh-CN"

import { useHomeStore } from "./store/home"

Locale.use("zh-CN", zhCN)

// 1. 判断是否是第一次加载,第一次加载不应用过渡动画
const isFirstLoad = ref(true)
const handleEnter = () => (isFirstLoad.value = false)

// 2. 移动端设置视口高度,不能使用100vh
const documentHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`)
}

window.addEventListener("resize", documentHeight)
documentHeight()

// 3. 禁止左右滑动控制前进后退
let startX: number
const handleTouchStart = (e: TouchEvent) => (startX = e.touches[0].pageX)
const handleTouchMove = (e: TouchEvent) => {
  const moveX = e.touches[0].pageX
  const diffX = moveX - startX
  // 假定滑动阈值为5，可按需调整
  if (Math.abs(diffX) > 5) e.preventDefault()
}
document.addEventListener("touchstart", handleTouchStart, { passive: false })
document.addEventListener("touchmove", handleTouchMove, { passive: false })

// 每次加载页面,请求当前位置的坐标(不在首页设置是为了用户在任何页面刷新时都能获取到坐标)
const homeStore = useHomeStore()
homeStore.fetchLL()
</script>

<template>
  <div class="app-wrapper" :class="isFirstLoad ? '' : 'app-container'">
    <router-view v-slot="{ Component, route }">
      <transition
        :name="route.meta.title === '首页' ? 'slide-right' : 'slide-left'"
        @enter="handleEnter"
      >
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
:root {
  --doc-height: 100%;
}

.app-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  height: var(--doc-height);
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app-container .slide-left-enter-from,
.app-container .slide-right-leave-to,
.app-container .slide-right-enter-from,
.app-container .slide-left-leave-to {
  position: absolute;
  inset: 0;
}

.app-container .slide-left-enter-from,
.app-container .slide-right-leave-to {
  transform: translateX(100%);
}

.app-container .slide-right-enter-from,
.app-container .slide-left-leave-to {
  transform: translateX(-100%);
}

.app-container .slide-left-enter-to,
.app-container .slide-right-leave-from,
.app-container .slide-right-enter-to,
.app-container .slide-left-leave-from {
  position: absolute;
  inset: 0;
  transform: translateX(0);
}

.app-container .slide-left-enter-active,
.app-container .slide-right-leave-active,
.app-container .slide-right-enter-active,
.app-container .slide-left-leave-active {
  position: absolute;
  inset: 0;
  transition: transform 0.3s;
}
</style>
