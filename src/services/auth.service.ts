import request from './rest.service'

export const googleAuthProvider = async () => {
  try {
    const res = await request<MOVIEOLOGY.GoogleAuthResponse>({
      method: 'get',
      url: `auth/google/callback${location.search}`
    })
    return res
  } catch (err) {
    throw err
  }
}

export const fetchUserProfile = async () => {
  try {
    const res = await request<MOVIEOLOGY.Profile>({
      method: 'get',
      url: `users/me`
    })
    return res
  } catch (err) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    throw err
  }
}
