import { defineStore } from 'pinia'

import { getMember } from '@/services/memberService'
import { getNarvaroDate } from '@/services/narvaroService'

export const useAddNarvaroStore = defineStore('addNarvaro', {
  state: () => {
    return {
      personNum: null,
      firstName: null,
      lastName: null,
      type: null,
      hasLicense: false,

      isMember: false,

      types: [
        { name: 'Träning', noMembers: false },
        { name: 'Prova på', noMembers: true },
        { name: 'Ledare', noMembers: false }
      ]
    }
  },
  getters: {
    formattedPersonNum(state) {
      if (state.isPersonNumValid() !== true) {
        return null
      }
      return state.personNum.substring(0, 8) + '-' + state.personNum.substring(8)
    },

    isNameValid(state) {
      if (state.firstName == null || state.firstName.trim().length === 0) {
        return 'Skriv in ditt förnamn.'
      }
      if (state.lastName == null || state.lastName.trim().length === 0) {
        return 'Skriv in ditt efternamn.'
      }

      state.firstName = state.firstName.trim()
      state.lastName = state.lastName.trim()

      return true
    },

    needLicense(state) {
      if (state.isPersonNumValid() !== true) {
        return true
      }

      const birthYear = parseInt(state.personNum.substring(0, 4))
      const currentYear = new Date().getFullYear()
      if (state.type === 'Ledare' || birthYear > currentYear - 13) {
        return false
      }

      return true
    }
  },
  actions: {
    async submitPersonNum(_personNum) {
      const personNumToSubmit = _personNum || this.personNum

      const personNumRes = this.isPersonNumValid(personNumToSubmit)
      if (personNumRes !== true) {
        // Error
        return personNumRes
      }

      // Get current date
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Adding 1 because months are zero-indexed
      const day = currentDate.getDate().toString().padStart(2, '0')
      // Construct the date string in the desired format
      const formattedDate = `${year}-${month}-${day}`

      const narvaroDateRes = await getNarvaroDate(formattedDate, personNumToSubmit)
      if (narvaroDateRes.data?.length > 0) {
        return 'Personnummret är redan anmält idag.'
      }

      const memberRes = await getMember(personNumToSubmit)
      if (memberRes.data.status === 'success' && memberRes.data.length > 0) {
        this.firstName = memberRes.data.data[0].first_name
        this.lastName = memberRes.data.data[0].last_name
        this.isMember = true
      } else {
        this.isMember = false
      }

      this.personNum = personNumToSubmit
      return true
    },

    isPersonNumValid(_personNum) {
      const personNumToCheck = _personNum || this.personNum

      if (personNumToCheck == null) {
        return 'Måste ange personnummer.'
      }

      if (/\D/.test(personNumToCheck) === true) {
        return 'Personnumret får bara innehålla siffror.'
      }

      if (personNumToCheck.length != 12) {
        return 'Personnummret måste vara 12 siffror.'
      }

      const currentYear = new Date().getFullYear()
      if (personNumToCheck < (currentYear - 150) * Math.pow(10, 8)) {
        // Person too old to exist, birthdate more than 150 years from now
        return `Du kan inte vara född för ${currentYear - personNumToCheck.substring(0, 4)} år sen.`
      }
      if (personNumToCheck > currentYear * Math.pow(10, 8)) {
        // Person too young to exist, birthdate after currentYear
        return 'Du kan inte vara född i framtiden.'
      }

      const month = parseInt(personNumToCheck.substring(4, 6))
      if (month < 1 || month > 12) {
        return 'Skriv in en giltig månad.'
      }

      const day = parseInt(personNumToCheck.substring(6, 8))
      if (day < 1 || day > 31) {
        return 'Skriv in en giltig dag.'
      }

      // Check with mathematical function if personNum could be legit
      const smallPersonNumArray = personNumToCheck.substring(2).split('')
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
      this.type = null
      this.hasLicense = false
      this.isMember = false
    }
  }
})
