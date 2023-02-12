import request from './rest.service'
export const pushToWishList = async (movie: MOVIEOLOGY.TMDBMovie) => {
  try {
    const result = await request<MOVIEOLOGY.WishListItem>({
      method: 'post',
      url: 'wish-lists',
      data: movie
    })
    console.log(result)
    return result
  } catch (error) {
    throw error
  }
}

export const fetchWishList = async () => {
  try {
    const result = await request<MOVIEOLOGY.WishListItem[]>({
      method: 'get',
      url: 'wish-lists'
    })
    return result
  } catch (error) {
    throw error
  }
}
