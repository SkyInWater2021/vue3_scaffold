<script lang="ts" setup>
interface PropType {
  prefix?: string
  name: string
  color?: string
}

defineOptions({
  name: "SvgIcon",
})

const props = withDefaults(defineProps<PropType>(), {
  prefix: "icon",
  color: "#333",
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>
