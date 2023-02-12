<template>
  <div class="search-result">
    <ul class="movie-list">
      <slot />
    </ul>
    <!-- movieStore.searchResult.total_results === 0 -->
    <div v-if="isEmpty" class="movie-list__nothing-found">
      <h3 class="movie-list__nothing-found--title">Ничего не найдено</h3>
      <p>
        Может быть ваш фильм еще снимают. Попробуйте поискать английское
        название
      </p>

      <img src="@/assets/arts/movie.png" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue-demi'

defineProps({
  isEmpty: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">
@import '@/assets/styles';

.movie-list {
  list-style-type: none;
  padding-inline-start: 0;
  &__nothing-found {
    width: 100%;
    background-color: $color-white;
    border-radius: $spacing-s;
    box-shadow: #000 0px 2px 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-m;
    text-align: center;

    &--title {
      margin: 0;
    }

    img {
      width: 100%;
      border-radius: $spacing-s;
    }
  }
}
</style>
