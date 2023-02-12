import { ElLoading } from 'element-plus'

export const usePreloader = async (func: () => Promise<any>) => {
  const preloader = ElLoading.service()
  const result = await func()
  preloader.close()

  return result
}
