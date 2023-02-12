<template>
  <div class="tab" :class="{ tab__active: active }" @click="$emit('click')">
    {{ title }}
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'

defineProps({
  id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">
.tab {
  color: rgba(255, 255, 255, 0.674);
  font-weight: bold;
  padding-bottom: 6px;

  &__active {
    color: white;
    border-bottom: 2px solid white;
  }
}
</style>
