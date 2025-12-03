//This file contains authentication calls to the backend API

import { protectedApi, publicApi } from '@/lib/axios'

export const UserService = {
  async login(email: string, password: string) {
    const response = await publicApi.post('/auth/signin', {
      email: email,
      password: password,
    })
    return response.data
  },

  async register(name: string, email: string, password: string) {
    const response = await publicApi.post('/auth/signup', {
      name: name,
      email: email,
      password: password,
    })
    return response.data
  },

  async fetchUserLoggedIn() {
    const response = await protectedApi.get('/user/me')
    return response.data
  },
}
