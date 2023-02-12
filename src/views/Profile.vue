<template>
  <page class="profile-page">
    <template #prepend>
      <gs-icon icon="arrow-left" size="32" @click="$router.back()" />
    </template>
    <div class="profile-page__info">
      <el-avatar
        :size="100"
        src="https://image.flaticon.com/icons/png/512/2586/2586717.png"
      />

      <div class="profile-page__info_block">
        <h2>
          {{ userStore.profile.username }}
        </h2>
      </div>
    </div>
    <mv-tabs>
      <mv-tab
        v-for="({ title, id }, index) in tabs"
        :title="title"
        :key="index"
        @click="activeTab = id"
        :active="activeTab === id"
      />
    </mv-tabs>

    <div class="profile-page__listing" v-if="activeTab === 'favorite'">
      <img
        v-for="movie in userStore.favorites"
        :key="movie.favId"
        :src="movie.Poster"
        @click="$router.push({ name: 'movie', params: { id: movie.id } })"
      />
    </div>

    <div class="profile-page__wishlist" v-else>
      <router-link to="search" class="el-button link-button">
        <i class="el-icon-edit"></i>
        Добавить фильм
      </router-link>
      <div class="profile-page__listing">
        <img
          v-for="{ movie } in userStore.wishes"
          :key="movie.id"
          :src="movie.Poster"
          @click="$router.push({ name: 'movie', params: { id: movie.id } })"
        />
      </div>
    </div>
  </page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Stores
import { useUserStore } from '@/stores'

// Components
import { ElAvatar } from 'element-plus'
import GsIcon from '@/components/Icons/GsIcon.vue'
import MvTabs from '@/components/Tabs.vue'
import MvTab from '@/components/Tab.vue'

const activeTab = ref('favorite')
const tabs = [
  { id: 'favorite', title: 'Любимые' },
  { id: 'wish', title: 'Хочу посмотреть' }
]

const userStore = useUserStore()
userStore.fetchFavs()
userStore.getWishList()
</script>

<style lang="scss">
@import '@/assets/styles';

.profile-page {
  &__info {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &_block {
      color: $color-white;
    }
  }

  &__wishlist {
    padding: 0 10px;

    .link-button {
      text-decoration: none;
      border-color: #fe4141;
      color: #fe4141;
      background: none;
      width: 100%;
      margin-bottom: 10px;
      &:hover,
      &:focus,
      &:active {
        color: #fe4141 !important;
        background: none !important;
        border: 1px solid #fe4141 !important;
      }
    }
  }

  &__listing {
    column-count: 3;
    column-gap: 1em;
    padding: 0 10px;

    img {
      background-color: #eee;
      display: inline-block;
      margin: 0 0 0.5em;
      width: 100%;
    }
  }
}
</style>
