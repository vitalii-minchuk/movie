<template>
  <v-row>
    <v-btn @click="increment" prepend-icon="mdi-plus" variant="tonal">
      Button
    </v-btn>
    <div>pos: {{ x }}, {{ y }}</div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Count: {{ count }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-row>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { useCounterStore } from '@/stores/counter'

const { count, doubleCount, increment } = useCounterStore()
console.log(count, doubleCount)
const { x, y } = useMouse()
</script>
