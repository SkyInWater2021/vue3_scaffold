<script lang="ts" setup>
import type { Component } from "vue"

const radioOptions = [
  {
    label: "文件收发",
    cpn: defineAsyncComponent(() => import("./c-cpns/file-chart.vue")),
  },
  {
    label: "四级编码",
    cpn: defineAsyncComponent(() => import("@/components/page-list/code-list.vue")),
  },
]

const tags = ref<{ code: string; cpn: Component }[]>([])
const currentType = ref(radioOptions[0].label)
const currentSingleCodeType = ref("")

const hasTag = computed(() => tags.value.some(item => item.code === currentType.value))

const contentCpn = computed(() => {
  const tagItem = tags.value.find(item => item.code === currentType.value)
  if (tagItem) return tagItem.cpn

  return radioOptions.find(item => item.label === currentType.value)?.cpn
})

const handleTagAdd = (code: string, type: string) => {
  currentType.value = code
  currentSingleCodeType.value = type

  if (!hasTag.value) {
    tags.value.unshift({
      code,
      cpn: markRaw(
        defineAsyncComponent(() => import("@/components/page-list/single-code-list.vue")),
      ),
    })
  }
}

const handleTagClick = (tag: string) => (currentType.value = tag)
const handleTagClose = (tag: string) => {
  const index = tags.value.findIndex(item => item.code === tag)
  if (index !== -1) tags.value.splice(index, 1)
  if (currentType.value === tag) {
    currentType.value = tags.value[index - 1]?.code ?? radioOptions[radioOptions.length - 1].label
  }
}

const handleTagClear = () => {
  if (hasTag.value) currentType.value = radioOptions[radioOptions.length - 1].label

  tags.value.length = 0
}
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="com-floodlit-box mb-2.5 flex items-center p-2.5">
      <el-radio-group v-model="currentType" class="mr-2.5">
        <el-radio v-for="option in radioOptions" :key="option.label" :label="option.label" border>
          {{ option.label }}
        </el-radio>
      </el-radio-group>

      <template v-if="tags.length > 0">
        <IconEpBrush class="rotate-180 cursor-pointer" @click="handleTagClear" />
        <el-scrollbar class="flex-1" always>
          <div class="flex">
            <el-tag
              v-for="tag in tags"
              :key="tag.code"
              closable
              plain
              size="large"
              class="ml-2.5 cursor-pointer"
              :type="currentType === tag.code ? undefined : 'info'"
              @click="handleTagClick(tag.code)"
              @close="handleTagClose(tag.code)"
            >
              {{ tag.code }}
            </el-tag>
          </div>
        </el-scrollbar>
      </template>
    </div>

    <div class="flex-1">
      <KeepAlive>
        <component
          :is="contentCpn"
          :code="currentType"
          :currentType="currentSingleCodeType"
          @typeClick="handleTagAdd"
        />
      </KeepAlive>
    </div>
  </div>
</template>
