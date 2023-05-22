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
  getters: {
    BMR: state => {
      switch (state.userData.gender) {
        case 'male':
          return 10 * state.userData.weight + 6.25 * state.userData.height - 5 * state.userData.age + 5
        case 'female':
          return 10 * state.userData.weight + 6.25 * state.userData.height - 5 * state.userData.age - 161
      }
    },
    TDEE: state => {
      switch (state.userData.activityLevel) {
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
    updateUserData(newData) {
      this.userData = newData
    },
  },
  persist: true
})