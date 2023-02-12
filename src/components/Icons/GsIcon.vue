<template>
  <svg aria-hidden="true" class="gs-icon" :style="styleObject">
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script lang="ts" setup>
import { computed, defineProps } from '@vue/runtime-core'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    required: false,
    default: null
  }
})

const styleObject = computed(() => {
  type IconStyle = {
    width?: string
    height?: string
  }

  const style: IconStyle = {}

  if (props.size) {
    style.height = `${props.size}px`
    style.width = `${props.size}px`
  }

  return style
})
</script>

<style lang="scss" scoped>
.gs-icon {
  fill: currentColor;
  height: 16px * 1.25;
  width: 16px * 1.25;
}
</style>
