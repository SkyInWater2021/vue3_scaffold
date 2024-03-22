<script setup lang="ts">
import { Locale } from "vant"
import zhCN from "vant/es/locale/lang/zh-CN"

Locale.use("zh-CN", zhCN)

const isFirstLoad = ref(true)
const handleEnter = () => (isFirstLoad.value = false)

// 移动端设置视口高度,不能使用100vh
const documentHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`)
}
window.addEventListener("resize", documentHeight)
documentHeight()

// 禁止左右滑动控制前进后退
document.addEventListener("touchstart", handleTouchStart, { passive: false })
document.addEventListener("touchmove", handleTouchMove, { passive: false })
let startX: number
function handleTouchStart(e: TouchEvent) {
  startX = e.touches[0].pageX
}
function handleTouchMove(e: TouchEvent) {
  const moveX = e.touches[0].pageX
  const diffX = moveX - startX
  if (Math.abs(diffX) > 5) {
    // 假定滑动阈值为5，可按需调整
    e.preventDefault()
  }
}
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
