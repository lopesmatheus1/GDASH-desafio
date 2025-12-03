import { ACCESS_TOKEN_KEY } from '@/constants/tokens'

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}
export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}
export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}
