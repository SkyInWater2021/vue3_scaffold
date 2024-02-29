<script lang="ts" setup>
import { FloodlitBtn } from "@/components"
import { menuRoutes } from "@/router/menu-routes"

import type { RouteRecordRaw } from "vue-router"

const router = useRouter()
const currentRoute = useRoute()

const currentActive = computed(() => currentRoute.path)

const changeMenu = (menuItem: RouteRecordRaw) => router.push(menuItem.path)
</script>

<template>
  <template v-for="menuItem in menuRoutes" :key="menuItem.name">
    <div class="mx-auto mb-4 mt-1 w-2/3" @click="changeMenu(menuItem)">
      <FloodlitBtn
        :active="currentActive === menuItem.path"
        :text="(menuItem.meta?.title as string) ?? ''"
      />
    </div>
  </template>
</template>
