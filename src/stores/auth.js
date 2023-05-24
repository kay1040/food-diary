import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    userId: null,
    token: '',
    expirationTime: 0,
  }),
  actions: {
    login(token, userId) {
      this.isLoggedIn = true
      this.userId = userId
      this.token = token
      const currentTime = Date.now();
      const timeout = 1000 * 60 * 60 * 24 * 7
      this.expirationTime = currentTime + timeout
    },
    logout() {
      this.isLoggedIn = false
      this.userId = null
      this.token = ''
      this.expirationTime = 0
    },
  },
  persist: true
})
