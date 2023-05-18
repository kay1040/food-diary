import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        gender: '',
        age: '',
        height: '',
        weight: '',
        activityLevel: '',
     }),
})