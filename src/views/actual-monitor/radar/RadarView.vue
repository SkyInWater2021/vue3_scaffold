<script lang="ts" setup>
import { TimeLine } from "@/components"
import { dateFormat } from "@/utils"

import RadarMap from "./MapRadar.vue"
import Setting from "./RadarSetting.vue"
import { classifyOptions } from "./config"

const loading = ref(false)
const router = useRouter()
const title = ref("四川省雷达拼图(组合反射率)")

const speed = computed(() => settingRef.value?.formData?.speed ?? 1)
const loop = computed(() => settingRef.value?.formData?.isLoop ?? false)
const timeLineRef = ref<InstanceType<typeof TimeLine>>()
const ticks = ["11:10", "11:20", "11:30", "11:40", "11:50", "12:00", "12:10"]
const currentTickIndex = computed(() => timeLineRef.value?.currentTickIndex ?? 0)

const settingRef = ref<InstanceType<typeof Setting>>()
function handleSettingConfirm() {
  loading.value = true
  const { formData } = settingRef.value!
  const str = classifyOptions.find(item => item.value === formData.classify)?.title
  title.value = `${str ?? ""}(${formData.radar})`
  // TODO 请求数据
  // ticks.value = [...]
  loading.value = false
}
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

    <!-- * loading -->
    <van-overlay :show="loading" z-index="99" style="--van-overlay-background: transparent">
      <div class="absolute inset-0 flex items-center justify-center">
        <van-loading type="spinner" size="24" vertical color="#4187f2"> 加载中... </van-loading>
      </div>
    </van-overlay>

    <!-- * title -->
    <div class="float float-title">
      <van-button icon="arrow-left" size="small" type="primary" round @click="router.back" />
      <div class="text-center">
        <div class="text-lg">{{ title }}</div>
      </div>
      <van-button icon="setting-o" size="small" type="primary" round @click="handleSettingShow" />
    </div>

    <!-- * changeTick -->
    <div class="float float-arrow left-0">
      <van-icon
        name="play"
        class="rotate-180"
        size="40"
        color="#eee"
        @click="timeLineRef?.changeTick('back')"
      />
    </div>
    <div class="float float-arrow right-0">
      <van-icon name="play" size="40" color="#eee" @click="timeLineRef?.changeTick('forward')" />
    </div>

    <!-- * tick -->
    <div class="absolute bottom-2 left-[2%] z-[99] w-[96%] rounded bg-white">
      <TimeLine ref="timeLineRef" :ticks="ticks" :speed="speed" :loop="loop" />
      <div class="absolute right-0 top-[-24px] w-fit rounded bg-white px-2.5">
        <span> {{ dateFormat(new Date(), "YYYY-MM-DD HH:") }}</span>
        <span>{{ timeLineRef?.currentTick }}</span>
        <span> BJT </span>
      </div>
    </div>

    <!-- * setting -->
    <Setting ref="settingRef" @confirm="handleSettingConfirm" />
  </div>
</template>

<style scoped>
.float {
  position: absolute;
  z-index: 9;
}

.float-title {
  top: 10px;
  right: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
}

.float-arrow {
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  transform: translateY(-50%);
  background-color: var(--global-gray-5);
}
</style>
