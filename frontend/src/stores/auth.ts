import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: number, name: string },
  }),
  actions: {
    setUser(user: { id: number, name: string }) {
      this.user = user
    },
    logout() {
      this.user = null
    }
  }
})
