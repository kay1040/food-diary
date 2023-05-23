import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null,
    token: '',
    expirationTime: 0,
  }),
  actions: {
    login(token, user) {
      this.isLoggedIn = true
      this.user = user
      this.token = token
      const currentTime = Date.now();
      const timeout = 1000 * 60 * 60 * 24 * 7
      this.expirationTime = currentTime + timeout
    },
    logout() {
      this.isLoggedIn = false
      this.user = null
      this.token = ''
      this.expirationTime = 0
    },
  },
  persist: true
})
