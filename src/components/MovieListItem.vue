<template>
  <li class="movie-card">
    <el-image
      class="movie-card-poster"
      :src="`${ROOT_IMAGE}${posterPath}`"
      size="small"
    />
    <div class="movie-card-info">
      <h3 class="movie-card-title">{{ title }}</h3>

      <p>{{ overview.slice(0, 50) }}...</p>
    </div>
    <el-button v-if="!added" type="danger">В лист</el-button>
    <div v-else class="movie-card-success"><i class="el-icon-success" /></div>
  </li>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { ElImage, ElButton } from 'element-plus'

const ROOT_IMAGE = 'https://image.tmdb.org/t/p/w500'

defineProps({
  title: {
    type: String,
    default: ''
  },
  overview: {
    type: String,
    default: ''
  },
  posterPath: {
    type: String,
    default: ''
  },
  added: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">
@import '@/assets/styles';
.movie-card {
  margin-bottom: $spacing-s;
  padding: $spacing-m;
  border-radius: 4px;
  background: white;
  display: grid;
  grid-template-columns: 70px 2fr 1fr;
  grid-column-gap: 10px;
  align-items: center;

  .el-button {
    height: 20px;
  }

  &-title {
    margin: 0;
  }

  &-success {
    min-height: 40px;
    background: green;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }
}
</style>
