import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      gender: '',
      age: '',
      height: '',
      weight: '',
      activityLevel: '',
    }
  }),
  getters: {
    BMR: state => {
      switch (state.userInfo.gender) {
        case 'male':
          return 10 * state.userInfo.weight + 6.25 * state.userInfo.height - 5 * state.userInfo.age + 5
        case 'female':
          return 10 * state.userInfo.weight + 6.25 * state.userInfo.height - 5 * state.userInfo.age - 161
      }
    },
    TDEE: state => {
      switch (state.userInfo.activityLevel) {
        case 'sedentary':
          return Math.round(state.BMR * 1.2)
        case 'lightly':
          return Math.round(state.BMR * 1.375)
        case 'moderately':
          return Math.round(state.BMR * 1.55)
        case 'heavy':
          return Math.round(state.BMR * 1.725)
        case 'extremely':
          return Math.round(state.BMR * 1.9)
      }
    },

  },
  actions: {
    updateUserInfo(newVal) {
      this.userInfo = newVal
    },
  },
  persist: true
})