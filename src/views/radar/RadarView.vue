<script lang="ts" setup>
import { PageHeader } from "@/components"

function hIndex(citations: number[]): number {
  let h = citations.length
  let temp = 0

  function hCertain(index: number) {
    temp = 0
    for (let i = 0; i < citations.length; i++) {
      if (citations[i] >= index) {
        temp++
      }
    }

    return temp === index
  }

  while (h !== temp) {
    const res = hCertain(h)
    if (res) break
    h--
  }

  return h
}

hIndex([3, 0, 6, 1, 5])
</script>

<template>
  <div class="">
    <PageHeader title="雷达" />
  </div>
</template>
