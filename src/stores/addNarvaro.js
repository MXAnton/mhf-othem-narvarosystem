import { defineStore } from 'pinia'

export const useAddNarvaroStore = defineStore('addNarvaro', {
  state: () => {
    return {
      personNum: null,
      firstName: null,
      lastName: null,
      isMember: false,
      type: null,
      hasLicense: false,

      types: [
        { name: 'Träning', noMembers: false },
        { name: 'Prova på', noMembers: true },
        { name: 'Ledare', noMembers: false }
      ]
    }
  },
  actions: {
    clearInputs() {
      this.personNum = null
      this.firstName = null
      this.lastName = null
      this.isMember = false
      this.type = null
      this.hasLicense = false
    }
  }
})
