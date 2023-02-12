<template>
  <div class="tabs">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
}
</style>
