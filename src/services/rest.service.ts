import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'

const BASE_API_URL = 'https://movie.incodewetrust.dev/'

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = BASE_API_URL
axiosInstance.defaults.method = 'POST'
axiosInstance.interceptors.response.use(
  (config) => config.data,
  (config) => Promise.reject(config.response.data)
)

export const setToken = (token: string) => {
  axiosInstance.defaults.headers.authorization = `Bearer ${token}`
}

const axiosFn = <T = void>(config: AxiosRequestConfig) => {
  const request: AxiosPromise<T> = axiosInstance({
    ...config
  })

  return request as any as Promise<T>
}

export default axiosFn
