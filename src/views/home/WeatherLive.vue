<script lang="ts" setup>
import SunDemo from "@/components/SunDemo.vue"
import { dateFormat, dateOffset, getWeekCn, traditionalDate } from "@/utils"

const info = {
  location: "成都市武侯区天府大道中段",
  temperature: "15.5",
  updateTime: dateFormat(new Date(), "HH时mm分"),
  dateInfo: getDateInfo(),
}

const forecast = reactive([
  {
    label: "昨天",
    date: dateOffset({ offset: -1, offsetType: "day", format: "D/M" }),
    day: "白天",
    night: "夜晚",
    temperature: "7/12",
  },
])

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

function getForecast() {
  const day = new Date().getDay()
  for (let i = 0; i < 6; i++) {
    forecast.push({
      label: i === 0 ? "今天" : getWeekCn(day + i),
      date: dateOffset({ offset: i, offsetType: "day", format: "D/M" }),
      day: "☀️",
      night: "⛅️",
      temperature: "7/12",
    })
  }
}

getForecast()
</script>

<template>
  <van-swipe indicator-color="white">
    <van-swipe-item v-for="item in 3" :key="item" class="py-2.5 text-white">
      <div class="p-2.5">{{ info.location }}</div>

      <div class="flex items-center px-4 pb-2.5">
        <div class="flex w-[20%] items-center justify-center">
          <SunDemo />
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
          <DividerLine />
          <div class="flex items-center">
            <van-icon name="description" :size="18" class="mr-1" />
            <span class="text-center text-xs">同步昨天上升4.5℃</span>
          </div>
        </div>
      </div>

      <div class="mb-2 flex h-[24px] justify-around px-4 text-center">
        <div>多云</div>
        <DividerLine vertical />
        <div>东北风 2级</div>
        <DividerLine vertical />
        <div>湿度 43%</div>
        <DividerLine vertical />
        <div>无降水</div>
      </div>

      <div>
        <div class="flex justify-between px-2.5">
          <span class="tab-item">趋势预报</span>
          <span class="text-xs text-pewter">12:00更新</span>
        </div>
        <DividerLine />

        <div class="flex justify-between p-2.5 pb-1 text-xs">
          <div v-for="item in forecast" :key="item.label">
            <div class="mb-2">{{ item.label }}</div>
            <div class="mb-2">{{ item.date }}</div>
            <div class="mb-2">{{ item.day }}</div>
            <div class="mb-2">{{ item.night }}</div>
            <div>{{ item.temperature }}</div>
          </div>
        </div>
        <DividerLine />
      </div>
    </van-swipe-item>
  </van-swipe>
</template>
