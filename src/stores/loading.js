import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    showLoading() {
      this.isLoading = true
    },
    closeLoading() {
      this.isLoading = false
    }
  }
})