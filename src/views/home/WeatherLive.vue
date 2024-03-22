<script lang="ts" setup>
import { homeApi } from "@/api/home"
import type { Daily, Now } from "@/api/home/types"
import { useHomeStore } from "@/store/home"
import { dateFormat, getCnWeek, getWeatherIcon, traditionalDate } from "@/utils"
import { DividerLine, PageLoading } from "@/views/components"

const homeStore = useHomeStore()

const info = reactive({
  location: "",
  temperature: 0,
  updateTime: "",
  dateInfo: getDateInfo(),
})

const dailyForecast = ref<Daily[]>([]) // 当前天气情况
const nowWeather = ref<Now>() // 未来一周天气预报

function getDateInfo() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const info = traditionalDate.solar2lunar(year, month, day) as unknown as Record<string, string>
  return {
    solar: dateFormat(date, "YYYY年M月D日"),
    lunar: `${info.gzYear}${info.IMonthCn}${info.IDayCn} ${info.ncWeek}`,
    info,
  }
}

// 请求实时天气数据
const fetchLoading = ref(false)
function fetchLiveData() {
  fetchLoading.value = true
  homeApi
    .fetchWeather()
    .then(({ code, data }) => {
      if (code === 200) {
        const { location, now, lastUpdate, daily } = data
        info.location = location.name ?? ""
        info.temperature = now.temperature ?? 0
        info.updateTime = lastUpdate.split(" ").pop() ?? ""
        dailyForecast.value = daily
        nowWeather.value = now
        homeStore.setPosition(location.longitude, location.latitude)
      }
    })
    .catch(() => console.error("fetch weatherLive error"))
    .finally(() => (fetchLoading.value = false))
}

function getIcon(num: number) {
  return getWeatherIcon(String(num), "png")
}

fetchLiveData()
</script>

<template>
  <PageLoading :loading="fetchLoading" />
  <van-swipe indicator-color="white">
    <van-swipe-item v-for="item in 2" :key="item" class="py-2.5 text-white">
      <div class="p-2.5">{{ info.location }}</div>

      <div class="flex items-center px-4 pb-2.5">
        <div class="flex w-[20%] items-center justify-center">
          <img :src="getIcon(0)" />
        </div>

        <div class="flex-1 text-center font-extralight">
          <div>
            <span class="text-4xl">{{ info.temperature }} </span>
            <span class="text-xl"> ℃</span>
          </div>
          <div class="text-xs text-pewter">{{ info.updateTime }}更新</div>
        </div>

        <div class="text-center">
          <div>{{ info.dateInfo.solar }}</div>
          <DividerLine />
          <div>{{ info.dateInfo.lunar }}</div>
        </div>
      </div>

      <div class="mb-2 flex h-[24px] justify-around px-4 text-center">
        <div>{{ dailyForecast[0]?.dayText ?? "-" }}</div>
        <DividerLine vertical />
        <div>
          {{ nowWeather?.windDirection ?? "-" }}
          {{ nowWeather?.windSpeed ?? "-" }}级
        </div>
        <DividerLine vertical />
        <div>湿度 {{ nowWeather?.humidity ?? "-" }}%</div>
        <DividerLine vertical />
        <div>
          {{ nowWeather?.precipitation ? `降水 ${nowWeather.precipitation}mm` : "无降水" }}
        </div>
      </div>

      <div>
        <div class="flex justify-between px-2.5">
          <span class="tab-item">趋势预报</span>
          <span class="text-xs text-pewter">{{ info.updateTime }}</span>
        </div>
        <DividerLine />

        <div class="flex items-center justify-between p-2.5 pb-1 text-xs">
          <div v-for="item in dailyForecast" :key="item.date" class="text-center">
            <div class="mb-2">{{ getCnWeek(item.date) }}</div>
            <div class="mb-2">{{ dateFormat(item.date, "M/D") }}</div>
            <img class="mx-auto mb-2 aspect-square h-[14px]" :src="getIcon(item.dayCode)" />
            <img class="mx-auto mb-2 aspect-square h-[14px]" :src="getIcon(item.nightCode)" />
            <div>{{ item.low + "/" + item.high }}℃</div>
          </div>
        </div>
        <DividerLine />
      </div>
    </van-swipe-item>
  </van-swipe>
</template>
