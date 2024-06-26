import { getLoggedInAdmin, login, logout } from '@/services/adminService'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => {
    return {
      userId: null,
      loggedInTime: null
    }
  },
  getters: {},
  actions: {
    async login(_username, _password) {
      this.logout()

      const loginRes = await login(_username, _password)
      if (loginRes.data?.status === 'success' && loginRes.data?.length > 0) {
        this.userId = loginRes.data.data
        this.loggedInTime = new Date().getTime()
        return true
      }

      return loginRes
    },

    async getLoggedInAdmin() {
      const loginRes = await getLoggedInAdmin()
      if (loginRes.data?.status === 'success') {
        this.userId = loginRes.data
        this.loggedInTime = new Date().getTime()
        return true
      }

      this.userId = null
      this.loggedInTime = null
      return null
    },

    async logout() {
      const logoutRes = await logout()
      if (logoutRes.data?.status === 'success') {
        this.userId = null
        this.loggedInTime = null
      }

      return logoutRes
    }
  }
})
