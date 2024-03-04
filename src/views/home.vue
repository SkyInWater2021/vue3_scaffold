<script lang="ts" setup>
import CylinderBar from "./cylinder-bar.vue"

const data = {
  xData: ["1", "2", "3", "4", "5", "6", "7"],
  lineData: [5, 4, 32, 1, 5, 6, 7],
  barData: [10, 20, 30, 40, 50, 60, 70],
  barSpace: 50,
  lineSpace: 50,
}
</script>

<template>
  <div>
    <CylinderBar :data="data" />
  </div>
</template>
