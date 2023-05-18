import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {
      gender: '',
      age: '',
      height: '',
      weight: '',
      activityLevel: '',
    }
  }),
})