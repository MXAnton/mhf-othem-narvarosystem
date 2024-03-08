import { defineStore } from 'pinia'

export const useAddNarvaroStore = defineStore('addNarvaro', {
  state: () => {
    return {
      personNum: null,
      firstName: null,
      lastName: null,
      isMember: false,
      type: null,
      hasLicense: false
    }
  }
  // actions: {
  //   increment() {
  //     this.count++
  //   },
  // },
})
