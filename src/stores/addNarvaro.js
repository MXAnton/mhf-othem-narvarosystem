import { defineStore } from 'pinia'

export const useAddNarvaroStore = defineStore('addNarvaro', {
  state: () => {
    return {
      personNum: null,
      firstName: null,
      lastName: null,
      isMember: null,
      type: null,
      hasLicense: null
    }
  }
  // actions: {
  //   increment() {
  //     this.count++
  //   },
  // },
})
