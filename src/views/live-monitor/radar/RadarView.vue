<script lang="ts" setup>
import { dateFormat } from "@/utils/format-date"
import { PageLoading, TimeShaft } from "@/views/components"

import RadarMap from "./RadarMap.vue"
import Setting from "./RadarSetting.vue"
import { classifyOptions } from "./config"

const router = useRouter()

const settingRef = ref<InstanceType<typeof Setting>>()
const timeLineRef = ref<InstanceType<typeof TimeShaft>>()

const loading = ref(false)
const title = ref("四川省雷达拼图(组合反射率)")

const ticks = ["11:10", "11:20", "11:30", "11:40", "11:50", "12:00", "12:10"]
const currentTickIndex = ref(0)

const speed = computed(() => settingRef.value?.formData?.speed ?? 1)
const loop = computed(() => settingRef.value?.formData?.isLoop ?? false)

function handleSettingConfirm() {
  loading.value = true
  const { formData } = settingRef.value!
  const str = classifyOptions.find(item => item.value === formData.classify)?.title
  title.value = `${str ?? ""}(${formData.radar})`
  // TODO 请求数据
  // ticks.value = [...]
  console.log("当前设置信息🍊🍊:", formData)
  loading.value = false
}

// 弹出设置框
function handleSettingShow() {
  timeLineRef.value?.stop()
  settingRef.value?.changeOverlay(true)
}

onMounted(() => {
  handleSettingConfirm()
})
</script>

<template>
  <div class="relative h-full">
    <RadarMap :currentIndex="currentTickIndex" />

    <PageLoading :loading="loading" />

    <!-- * title -->
    <div class="welding welding-title">
      <van-button icon="arrow-left" size="small" type="primary" round @click="router.back" />
      <div class="text-center">
        <div class="text-lg">{{ title }}</div>
      </div>
      <van-button icon="setting-o" size="small" type="primary" round @click="handleSettingShow" />
    </div>

    <!-- * changeTick -->
    <div class="welding welding-arrow left-0">
      <van-icon
        name="play"
        class="rotate-180"
        size="40"
        color="#eee"
        @click="timeLineRef?.changeTick('back')"
      />
    </div>
    <div class="welding welding-arrow right-0">
      <van-icon name="play" size="40" color="#eee" @click="timeLineRef?.changeTick('forward')" />
    </div>

    <!-- * tick -->
    <div class="absolute bottom-2 left-[2%] z-[99] w-[96%] rounded bg-white">
      <TimeShaft
        ref="timeLineRef"
        v-model="currentTickIndex"
        :ticks="ticks"
        :speed="speed"
        :loop="loop"
      />
      <div class="absolute right-0 top-[-24px] w-fit rounded bg-white px-2.5">
        <span> {{ dateFormat(new Date(), "YYYY-MM-DD HH:") }}</span>
        <span>{{ ticks[currentTickIndex] }}</span>
        <span> BJT </span>
      </div>
    </div>

    <!-- * setting -->
    <Setting ref="settingRef" @confirm="handleSettingConfirm" />
  </div>
</template>

<style scoped>
.welding {
  position: absolute;
  z-index: 9;
}

.welding-title {
  top: 10px;
  right: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
}

.welding-arrow {
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  transform: translateY(-50%);
  background-color: var(--global-gray-5);
}
</style>
