<script lang="ts" setup>
import type { CheckBoxItem, CheckBoxValue } from "./types"

defineProps<{ config: CheckBoxItem[] }>()

const modelChecks = defineModel<CheckBoxValue[]>({ required: true })
</script>

<template>
  <div class="">
    <van-checkbox-group v-model="modelChecks" shape="square" direction="horizontal" icon-size="22">
      <van-checkbox
        v-for="item in config"
        :key="item.text"
        :name="item.value"
        :disabled="item.disabled"
      >
        {{ item.text }}
      </van-checkbox>
    </van-checkbox-group>
  </div>
</template>
