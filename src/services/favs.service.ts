import request from './rest.service'

export const like = async (movieId: string) => {
  try {
    const userId = localStorage.getItem('userId')
    const like = await request({
      method: 'post',
      url: 'favorites',
      data: {
        profile: userId,
        movie: movieId
      }
    })
    return like
  } catch (err) {
    throw err
  }
}

export const unlike = async (movie: string) => {
  try {
    const profile = localStorage.getItem('userId')
    const like = await request({
      method: 'delete',
      url: `/movies/remove-from-fav`,
      data: {
        profile,
        movie
      }
    })

    return like
  } catch (err) {
    throw err
  }
}

export const checkIsFav = async (movie: string) => {
  try {
    const profile = localStorage.getItem('userId')
    const fav = await request<{ inFavorites: boolean }>({
      method: 'post',
      url: `/movies/is-fav`,
      data: {
        profile,
        movie
      }
    })
    return fav.inFavorites
  } catch (err) {
    return false
  }
}

export const fetchFavs = async () => {
  try {
    const favs = await request<MOVIEOLOGY.FavoriteMovie[]>({
      method: 'get',
      url: 'favorites'
    })
    return favs
  } catch (error) {
    throw error
  }
}
