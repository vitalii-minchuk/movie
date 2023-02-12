import { defineStore } from 'pinia'
// import router from '@/router'

// Services
import {
  fetchMovie,
  suggestMovie,
  movieSearch
} from '../services/movie.service'

import { pushToWishList } from '../services/wish.service'
import { checkIsFav, like, unlike } from '../services/favs.service'

// Notification
import { ElMessage } from 'element-plus'

type MovieStore = {
  currentMovie: MOVIEOLOGY.Movie
  loading: boolean
  isFav: boolean
  searchResult: MOVIEOLOGY.SearchResult
  wishingError: string | null
}

export const useMovieStore = defineStore({
  id: 'movies',
  state: () =>
    <MovieStore>{
      currentMovie: {},
      loading: false,
      isFav: false,
      searchResult: {},
      wishingError: null
    },
  getters: {
    movie: ({ currentMovie }) => currentMovie,
    foundMovie: ({ searchResult }) => searchResult.results,
    totalFound: ({ searchResult }) => searchResult.total_results
  },
  actions: {
    async fetchSuggestedMovie() {
      this.loading = true
      this.currentMovie = await suggestMovie()
      this.isFav = await checkIsFav(this.currentMovie.id)
      this.loading = false
      return this.currentMovie
    },
    async fetchMovie(id: string) {
      this.loading = true
      const result = await fetchMovie(id)
      this.currentMovie = result[0]
      this.isFav = await checkIsFav(this.currentMovie.id)
      return this.currentMovie
    },
    async addToFavorite(movieId: string) {
      try {
        await like(movieId)
        this.isFav = true
      } catch (err) {
        this.isFav = false
      }
    },
    async removeFromFavorite(movieId: string) {
      try {
        await unlike(movieId)
        this.isFav = false
      } catch (err) {
        this.isFav = false
      }
    },
    async search(searchQuery: string) {
      const foundMovies = await movieSearch(searchQuery)
      this.searchResult = foundMovies
    },
    async addToWishList(movie: MOVIEOLOGY.TMDBMovie) {
      try {
        await pushToWishList(movie)
        ElMessage.success({
          message: 'Добавлено',
          type: 'success'
        })

        const foundIndex = this.searchResult.results.findIndex(
          (item) => item.id === movie.id
        )

        this.searchResult.results[foundIndex] = {
          ...this.searchResult.results[foundIndex],
          added: true
        }
      } catch (err) {
        ElMessage.error({
          message: 'Уже в списке :)',
          type: 'error'
        })
        this.wishingError = err.data.message
      }
    }
  }
})
