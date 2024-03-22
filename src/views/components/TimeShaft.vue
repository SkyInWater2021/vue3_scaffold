<script lang="ts" setup>
interface PropsType {
  ticks: string[] // 当前时间刻度数组
  interval?: number // 显示刻度线间隔
  speed?: number // 播放速度
  loop?: boolean // 是否循环播放
}

const props = withDefaults(defineProps<PropsType>(), { interval: 2, speed: 1 })

const lineConfig = {
  activeColor: "#4c84f7",
  inactiveColor: "#d1d1d1",
  width: "2px",
  widthVal: 2,
}

const isPlaying = ref(false)
const maxTickIndex = computed(() => props.ticks.length - 1) // 最大刻度索引

const currentTickIndex = defineModel<number>({ required: true }) // 当前刻度索引

// 切换播放状态
const togglePlay = () => (isPlaying.value ? stop() : play())

let playTimer: ReturnType<typeof setInterval>

// 开始播放
function play() {
  isPlaying.value = true
  if (currentTickIndex.value >= maxTickIndex.value) currentTickIndex.value = 0

  playTimer = setInterval(() => {
    if (currentTickIndex.value >= maxTickIndex.value) {
      props.loop ? (currentTickIndex.value = 0) : stop()
    } else currentTickIndex.value++
  }, 1000 / props.speed)
}

// 停止播放
function stop() {
  isPlaying.value = false
  if (playTimer) clearInterval(playTimer)
}

// 轴的小点偏移纠正
function getDotOffset() {
  const index = currentTickIndex.value
  const mid = maxTickIndex.value / 2
  const oneOffset = (2 / maxTickIndex.value).toFixed(1)
  const offset = Math.abs(index - mid) * parseFloat(oneOffset)
  return index <= mid ? { left: `${offset}px` } : { right: `${offset}px` }
}

function changeTick(direction: "forward" | "back", step = 1) {
  currentTickIndex.value =
    direction === "forward"
      ? (currentTickIndex.value + step) % (maxTickIndex.value + 1)
      : (currentTickIndex.value - step + maxTickIndex.value + 1) % (maxTickIndex.value + 1)
}

onUnmounted(() => {
  clearInterval(playTimer)
})

defineExpose({ stop, changeTick })
</script>

<template>
  <div class="time-line-wrapper">
    <div class="mx-2.5">
      <van-icon
        size="30"
        :name="isPlaying ? 'stop-circle' : 'play-circle'"
        :color="lineConfig.activeColor"
        @click="togglePlay"
      />
    </div>

    <div class="time-slider">
      <van-slider
        v-model="currentTickIndex"
        :max="maxTickIndex"
        :bar-height="lineConfig.width"
        :inactive-color="lineConfig.inactiveColor"
        :active-color="lineConfig.activeColor"
      >
        <template #button>
          <div class="time-dot" :style="getDotOffset()"></div>
        </template>
      </van-slider>

      <div class="relative flex justify-between">
        <template v-for="(time, index) in ticks" :key="time">
          <div
            class="tick"
            v-show="index % interval === 0"
            :class="{ 'is-active': currentTickIndex >= index }"
          >
            <div class="flex justify-between">
              <div class="tick-time">{{ time }}</div>
            </div>
          </div>
        </template>

        <div class="is-active-bg"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.time-line-wrapper {
  display: flex;
  padding-top: 10px;
}

.time-slider {
  flex: 1;
  margin-bottom: 2px;
  padding-right: 20px;
}

.van-slider {
  border-radius: 0;
}

.time-dot {
  position: relative;
  width: 14px;
  height: 14px;
  background-image: radial-gradient(
    white 0%,
    white 30%,
    v-bind("lineConfig.activeColor") 30%,
    v-bind("lineConfig.activeColor") 100%
  );
  border-radius: 50%;
}

.tick {
  position: relative;
  z-index: -1; /* 保证在小点的下方 */
  width: v-bind("lineConfig.width");
  height: 30px;
  background-image: linear-gradient(
    v-bind("lineConfig.inactiveColor") 0%,
    v-bind("lineConfig.inactiveColor") 35%,
    transparent 35%,
    transparent 100%
  );
}

.tick-time {
  position: absolute;
  bottom: 0;
  left: 0;
  flex: 1;
  font-size: 12px;
  color: v-bind("lineConfig.inactiveColor");
  transform: translateX(-50%);
}

.is-active .tick-time {
  color: v-bind("lineConfig.activeColor");
}

.tick:nth-child(1) .tick-time {
  transform: translateX(0);
}

.tick:nth-last-child(2) .tick-time {
  transform: translateX(-100%);
}

.is-active.tick {
  background-image: linear-gradient(
    to bottom,
    v-bind("lineConfig.activeColor") 0%,
    v-bind("lineConfig.activeColor") 35%,
    transparent 35%,
    transparent 100%
  );
}

.is-active-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc(v-bind("currentTickIndex") / v-bind("maxTickIndex") * 100%);
  background: #4c84f722;
}
</style>
