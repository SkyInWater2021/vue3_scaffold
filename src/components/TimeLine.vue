<script lang="ts" setup>
interface PropsType {
  interval?: number
  ticks: string[]
  speed?: number
  loop?: boolean
}
const props = withDefaults(defineProps<PropsType>(), { interval: 2, speed: 1 })

const lineConfig = {
  activeColor: "#4c84f7",
  inactiveColor: "var(--van-gray-3)",
  width: "2px",
  widthVal: 2,
}

const currentTickIndex = ref(0)

const isPlaying = ref(false)
const maxTick = computed(() => props.ticks.length - 1)
const currentTick = computed(() => props.ticks[currentTickIndex.value] ?? "")
const playSwitching = () => (isPlaying.value ? stop() : play())

let playTimer = 0
function play() {
  isPlaying.value = true
  currentTickIndex.value = 0
  playTimer = setInterval(() => {
    currentTickIndex.value++
    if (currentTickIndex.value > maxTick.value) {
      props.loop ? (currentTickIndex.value = 0) : stop()
    }
  }, props.speed * 1000)
}

function stop() {
  isPlaying.value = false
  currentTickIndex.value = 0
  if (playTimer) clearInterval(playTimer)
}

// 轴的小点偏移纠正
function getDotOffset() {
  const index = currentTickIndex.value
  const middleIndex = maxTick.value / 2
  const oneOffset = Number((lineConfig.widthVal / maxTick.value).toFixed(1))
  const offsetPart = Math.abs(index - middleIndex)
  const finalOffset = (offsetPart * oneOffset).toFixed(1) + "px"
  if (index <= middleIndex) return { left: finalOffset }
  if (index > middleIndex) return { right: finalOffset }
}

function changeTick(type: "forward" | "back", step = 1) {
  const totalTicks = maxTick.value + 1
  if (type === "forward") {
    currentTickIndex.value = (currentTickIndex.value + step) % totalTicks
  } else if (type === "back") {
    currentTickIndex.value = (currentTickIndex.value - step + totalTicks) % totalTicks
  }
}

defineExpose({ currentTickIndex, currentTick, stop, changeTick } as const)
</script>

<template>
  <div class="time-line-wrapper">
    <div class="mx-2.5 pr-2.5">
      <van-icon
        size="30"
        :name="isPlaying ? 'stop-circle' : 'play-circle'"
        :color="lineConfig.activeColor"
        @click="playSwitching"
      />
    </div>

    <div class="time-slider">
      <van-slider
        v-model="currentTickIndex"
        :max="maxTick"
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
    v-bind("lineConfig.inactiveColor") 0%,
    v-bind("lineConfig.inactiveColor") 30%,
    v-bind("lineConfig.activeColor") 30%,
    v-bind("lineConfig.activeColor") 100%
  );
  border-radius: 50%;
}

.tick {
  position: relative;
  z-index: -1;
  width: v-bind("lineConfig.width");
  height: 35px;
  background-image: linear-gradient(
    v-bind("lineConfig.inactiveColor") 0%,
    v-bind("lineConfig.inactiveColor") 40%,
    transparent 40%,
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
    v-bind("lineConfig.activeColor") 40%,
    transparent 40%,
    transparent 100%
  );
}

.is-active-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc(v-bind("currentTickIndex") / v-bind("maxTick") * 100%);
  background: #4c84f722;
}
</style>
