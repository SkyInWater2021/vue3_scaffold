<script lang="ts" setup>
import { dateOffset } from "@/utils"

const nowTime = reactive({
  date: dateOffset({ utc: true }),
})

function getNowTime() {
  setInterval(() => (nowTime.date = dateOffset({ utc: true })), 1000)
}

onMounted(() => getNowTime())
</script>

<template>
  <div>{{ nowTime.date }}</div>
</template>
