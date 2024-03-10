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
    isPersonNumValid() {
      if (this.personNum == null) {
        return 'Måste ange personnummer.'
      }

      if (/\D/.test(this.personNum) === true) {
        return 'Personnumret får bara innehålla siffror.'
      }

      if (this.personNum.length != 12) {
        return 'Personnummret måste vara 12 siffror.'
      }

      const currentYear = new Date().getFullYear()
      if (this.personNum < (currentYear - 200) * Math.pow(10, 8)) {
        // Person too old to exist, birthdate more than 200 years from now
        return 'Du kan inte vara född för mer än 200 år sen.'
      }
      if (this.personNum > currentYear * Math.pow(10, 8)) {
        // Person too young to exist, birthdate after currentYear
        return 'Du kan inte vara född i framtiden.'
      }

      const month = parseInt(this.personNum.substring(4, 6))
      if (month < 1 || month > 12) {
        return 'Skriv in en giltig månad.'
      }

      const day = parseInt(this.personNum.substring(6, 8))
      if (day < 1 || day > 31) {
        return 'Skriv in en giltig dag.'
      }

      // Check with mathematical function if personNum could be legit
      const smallPersonNumArray = this.personNum.substring(2).split('')
      let checkSum = 0
      for (let _i = 0; _i < smallPersonNumArray.length; _i++) {
        let num = parseInt(smallPersonNumArray[_i])
        if (_i % 2 === 0) {
          // If even number
          num *= 2
        }

        num
          .toString()
          .split('')
          .forEach((_digit) => {
            checkSum += parseInt(_digit)
          })
      }
      if (checkSum % 10 !== 0) {
        return 'Personnummret är inte giltigt.'
      }

      return true
    },

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
