import { googleAuthProvider } from '@/services/auth.service'
import { defineStore } from 'pinia'
import { useUserStore } from './users.store'

type AuthStore = {
  loading: boolean
  token: string
  loginError: string
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () =>
    <AuthStore>{
      loading: false,
      loginError: null,
      token: ''
    },
  getters: {
    loggedIn: ({ token }) => !!token
  },
  actions: {
    setLoading() {
      this.loading = !this.loading
    },
    async googleAuth() {
      try {
        const { jwt, user } = await googleAuthProvider()
        localStorage.setItem('token', jwt)
        localStorage.setItem('userId', user.id)
        useUserStore().$patch({ profile: user })
      } catch (err) {
        this.loginError = JSON.stringify(err)
      }
    }
  }
})
