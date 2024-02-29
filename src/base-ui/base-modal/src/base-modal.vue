<script lang="ts" setup>
import { computed, ref } from "vue"

import type { ModalConfig, ModalEvents } from "../types"

const props = defineProps<{ config?: ModalConfig; events?: ModalEvents }>()

const visible = ref(false) // 弹窗的状态

// 弹窗默认配置信息
const defaultConfig = computed(() => {
  const config: ModalConfig = {
    headerStyle: { fontWeight: 600 },
    center: true,
    appendToBody: true,
    destroyOnClose: true,
    showFooter: true,
    showHeader: true,
    ...props.config,
  }
  return config
})

function changeVisible(isVisible: boolean) {
  visible.value = isVisible
}

defineExpose({ changeVisible })
</script>

<template>
  <el-dialog
    v-model="visible"
    v-bind="defaultConfig"
    :style="{
      minWidth: defaultConfig.minWidth,
      maxWidth: defaultConfig.maxWidth,
    }"
    v-on="events ?? {}"
  >
    <template #header>
      <slot v-if="defaultConfig.showHeader" name="header">
        <div :style="defaultConfig.headerStyle">
          {{ defaultConfig.title }}
        </div>
      </slot>
    </template>

    <slot />

    <template v-if="defaultConfig.showFooter" #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>
