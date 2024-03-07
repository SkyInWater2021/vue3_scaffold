<script lang="ts" setup>
import { homeRoutes } from "@/router/home-route"

const router = useRouter()

function handleIconClick(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="item-center flex flex-wrap">
    <div
      v-for="item in homeRoutes"
      :key="item.meta.title"
      class="mb-2.5 w-1/3"
      @click="handleIconClick(item.path)"
    >
      <div class="flex items-center justify-center">
        <img class="w-[50px]" :src="item.meta.icon" />
      </div>
      <div class="mt-1 text-center text-xs">{{ item.meta.title }}</div>
    </div>
  </div>
</template>
