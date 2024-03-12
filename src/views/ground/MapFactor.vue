<script lang="ts" setup>
import { factors } from "./config"

// 当前选择要素
const activeFactors = ref(["T24", "P24", "等压线"])
function handleFactorClick(val: string) {
  const index = activeFactors.value.indexOf(val)
  index === -1 ? activeFactors.value.push(val) : activeFactors.value.splice(index, 1)
}

defineExpose({
  activeFactors,
})
</script>

<template>
  <div class="factor-wrapper">
    <span
      v-for="item in factors"
      :key="item.text"
      class="factor-item"
      :class="{ 'is-active': activeFactors.includes(item.value) }"
      @click="handleFactorClick(item.value)"
    >
      {{ item.text }}
    </span>
  </div>
</template>
<style scoped>
.factor-wrapper {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 160px;
  padding: 2px;
  background-color: var(--global-gray-5);
  border-radius: 4px;
}

.factor-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc((1 / 4 * 100%) - 4px);
  height: 30px;
  margin: 2px;
  color: white;
  background-color: var(--global-gray-a);
  aspect-ratio: 1;
}

.factor-item.is-active {
  background-color: var(--global-blue);
}

.factor-item:last-child {
  width: 100%;
}
</style>
