<script lang="ts" setup>
import { ExtendedRouteRecordRaw, homeRoutes } from "@/router/home-route"

const showModal = ref(false)
const modalTitle = ref("")
const modalRoutes = ref<ExtendedRouteRecordRaw[]>([])

const router = useRouter()

function handleIconClick(menu: ExtendedRouteRecordRaw) {
  if (!menu.children) {
    router.push(menu.path)
    showModal.value = false
    return
  }

  modalRoutes.value = menu.children ?? []
  modalTitle.value = menu.meta.title
  showModal.value = true
}
</script>

<template>
  <div class="item-center flex flex-wrap">
    <div
      v-for="item in homeRoutes"
      :key="item.meta.title"
      class="mb-2.5 w-1/4"
      @click="handleIconClick(item)"
    >
      <div class="flex items-center justify-center">
        <img class="w-[50px]" :src="item.meta.icon" />
      </div>
      <div class="mt-1 text-center text-xs">{{ item.meta.title }}</div>
    </div>

    <van-action-sheet
      v-model:show="showModal"
      :title="modalTitle"
      :overlay-style="{ background: '#0002' }"
      style="--van-action-sheet-max-height: 60%; min-height: 50%"
    >
      <div class="item-center flex flex-wrap">
        <div
          v-for="item in modalRoutes"
          :key="item.meta.title"
          class="mb-2.5 w-1/4"
          @click="handleIconClick(item)"
        >
          <div class="flex items-center justify-center">
            <img class="w-[50px]" :src="item.meta.icon" />
          </div>
          <div class="mt-1 text-center text-xs">{{ item.meta.title }}</div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
