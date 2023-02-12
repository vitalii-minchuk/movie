import { defineStore } from 'pinia'

// Utils
import router from '@/router'
import { fetchUserProfile } from '@/services/auth.service'
import { fetchFavs } from '@/services/favs.service'
import { fetchWishList } from '@/services/wish.service'

type UserStore = {
  userId: string
  profile: MOVIEOLOGY.Profile
  favorites: MOVIEOLOGY.FavoriteMovie[]
  wishes: MOVIEOLOGY.WishListItem[]
}

export const useUserStore = defineStore({
  id: 'users',
  state: () => <UserStore>(<unknown>{
      favorites: [],
      wishes: [],
      userId: localStorage.getItem('userId'),
      profile: {}
    }),
  getters: {},
  actions: {
    init() {
      if (this.userId) {
        this.fetchProfile()
        return
      }
      this.logout()
    },
    logout() {
      router.push('/')
    },
    async fetchProfile() {
      try {
        this.profile = await fetchUserProfile()
      } catch (err) {
        this.logout()
      }
    },
    async fetchFavs() {
      this.favorites = await fetchFavs()
    },
    async getWishList() {
      this.wishes = await fetchWishList()
    }
  }
})
