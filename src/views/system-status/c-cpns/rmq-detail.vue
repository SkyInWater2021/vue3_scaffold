<script lang="ts" setup>
import { ContentTitle, FetchTime } from "@/components"
type CodeType = Record<string, string>

const radioOptions = reactive([
  {
    label: "三级页面列表",
    code: {},
    cpn: markRaw(defineAsyncComponent(() => import("./rmq-list.vue"))),
  },
])
const currentType = ref(radioOptions[0].label)

const tags = ref<{ code: CodeType; cpn: Component }[]>([])
const hasTag = computed(() => tags.value.some(item => item.code.tagName === currentType.value))
const currentTag = computed(() => {
  const tagItem = tags.value.find(item => item.code.tagName === currentType.value)
  if (tagItem) return tagItem
  return radioOptions.find(item => item.label === currentType.value)
})

const handleTagClick = (tag: string) => (currentType.value = tag)
const handleTagAdd = (code: CodeType) => {
  currentType.value = code.tagName
  if (hasTag.value) return
  tags.value.unshift({ code, cpn: markRaw(defineAsyncComponent(() => import("./rmq-queue.vue"))) })
}
const handleTagClose = (tag: string) => {
  const index = tags.value.findIndex(item => item.code.tagName === tag)
  if (index !== -1) tags.value.splice(index, 1)
  if (currentType.value === tag) {
    currentType.value =
      tags.value[index - 1]?.code.tagName ?? radioOptions[radioOptions.length - 1].label
  }
}
const handleTagClear = () => {
  if (hasTag.value) currentType.value = radioOptions[radioOptions.length - 1].label
  tags.value.length = 0
}

const cpnRef = ref()
</script>

<template>
  <div class="flex h-full flex-col">
    <ContentTitle>
      <div class="flex h-full items-center justify-between">
        <el-radio-group v-model="currentType" class="mr-2.5">
          <el-radio v-for="item in radioOptions" :key="item.label" :label="item.label" border>
            {{ item.label }}
          </el-radio>
        </el-radio-group>

        <template v-if="tags.length > 0">
          <IconEpBrush class="rotate-180 cursor-pointer" @click="handleTagClear" />

          <el-scrollbar class="flex-1 rounded-md" always>
            <div class="flex h-[40px] items-center">
              <el-tag
                v-for="tag in tags"
                :key="tag.code.tagName"
                closable
                plain
                size="large"
                class="ml-2.5 cursor-pointer"
                :type="currentType === tag.code.tagName ? undefined : 'info'"
                @click="handleTagClick(tag.code.tagName)"
                @close="handleTagClose(tag.code.tagName)"
              >
                {{ tag.code.tagName }}
              </el-tag>
            </div>
          </el-scrollbar>
        </template>

        <FetchTime
          v-if="cpnRef?.fetchTime"
          :loading="cpnRef?.tableLoading"
          :time="cpnRef?.fetchTime"
          @refresh="cpnRef?.fetchListData"
        />
      </div>
    </ContentTitle>

    <div class="flex-1">
      <component
        ref="cpnRef"
        class="h-full"
        :is="currentTag?.cpn"
        :code="currentTag?.code ?? {}"
        @tagAdd="handleTagAdd"
      />
    </div>
  </div>
</template>
