import {
  createWebHistory,
  createRouter,
  type NavigationGuard,
} from 'vue-router'
import { setToken } from './services/rest.service'
import { useAuthStore, useUserStore } from './stores'

const Home = () => import('./views/Home.vue')
const Profile = () => import('./views/Profile.vue')
const Login = () => import('./views/Login.vue')
const Movie = () => import('./views/Movie.vue')
const Search = () => import('./views/Search.vue')

const history = createWebHistory()

const profileGuard: NavigationGuard = (to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token) {
    next('/')
    return
  }

  next()
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: profileGuard,
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    beforeEnter: profileGuard,
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: Movie,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = createRouter({
  history,
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    setToken(token)
    useAuthStore().$patch({ token })
    // check if possible to fetch user Profile
    useUserStore().init()
  }

  next()
})

export default router
