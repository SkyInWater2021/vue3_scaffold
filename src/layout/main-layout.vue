<script lang="ts" setup>
import mainHeader from "./main-header/main-header.vue"
import MainMenu from "./main-menu/main-menu.vue"

const headerHeight = "55px"
const menuWidth = "150px"
const delay = "100ms"

const isFold = ref(false)
const handleFold = () => (isFold.value = !isFold.value)
</script>

<template>
  <div class="com-scrollbar-hide flex h-full flex-col">
    <header class="com-floodlit-box relative">
      <main-header :style="{ height: headerHeight }" />

      <div class="fold-container">
        <IconEpExpand v-if="isFold" @click="handleFold" />
        <IconEpFold v-else @click="handleFold" />
      </div>
    </header>

    <div class="com-scrollbar-hide flex flex-1">
      <aside
        class="com-scrollbar-hide com-floodlit-box py-2.5"
        :style="{ width: isFold ? '0' : menuWidth, transition: `width ${delay} ease-out` }"
      >
        <main-menu />
      </aside>

      <main class="com-scrollbar-hide com-floodlit-box h-full flex-1 p-2.5">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.fold-container {
  @apply absolute bottom-0 left-6 top-0 mx-auto;
  @apply flex place-items-center;
  @apply text-2xl text-global-blue-dark;
  @apply hover:text-global-blue-lighter;
  @apply cursor-pointer transition-all;
}
</style>
