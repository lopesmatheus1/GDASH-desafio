import axios from 'axios'

import { getAccessToken } from '@/helpers/tokens'

export const protectedApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

protectedApi.interceptors.request.use((request) => {
  const accessToken = getAccessToken()

  if (!accessToken) {
    return request
  }
  request.headers.Authorization = `Bearer ${accessToken}`
  return request
})
