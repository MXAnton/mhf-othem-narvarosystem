import { defineStore } from 'pinia'

import { getMember } from '@/services/memberService'
import { getNarvaroDate } from '@/services/narvaroService'

import { dateFormatted, isPersonNumValid } from '@/helpers'

export const useAddNarvaroStore = defineStore('addNarvaro', {
  state: () => {
    return {
      personNum: null,
      firstName: null,
      lastName: null,
      type: null,
      hasLicense: false,

      membershipEndDate: null,

      types: [
        { name: 'Träning', noMembers: false },
        { name: 'Prova på', noMembers: true },
        { name: 'Ledare', noMembers: false }
      ]
    }
  },
  getters: {
    needLicense(state) {
      if (isPersonNumValid(state.personNum) !== true) {
        return true
      }

      const birthYear = parseInt(state.personNum.substring(0, 4))
      const currentYear = new Date().getFullYear()
      if (state.type === 'Ledare' || birthYear > currentYear - 13) {
        return false
      }

      return true
    },

    isActiveMember(state) {
      if (state.membershipEndDate == null) {
        return false
      }

      const currentDate = new Date()
      const formattedCurrentDate =
        '' +
        currentDate.getUTCFullYear() +
        (currentDate.getUTCMonth() + 1).toString().padStart(2, '0') +
        currentDate.getUTCDate().toString().padStart(2, '0')

      const endDate = new Date(state.membershipEndDate)
      const formattedEndDate =
        '' +
        endDate.getUTCFullYear() +
        (endDate.getUTCMonth() + 1).toString().padStart(2, '0') +
        (endDate.getUTCDate() + 1).toString().padStart(2, '0')

      if (formattedCurrentDate > formattedEndDate) {
        return false
      }

      return true
    }
  },
  actions: {
    async submitPersonNum(_personNum) {
      const personNumToSubmit = _personNum || this.personNum

      const personNumRes = isPersonNumValid(personNumToSubmit)
      if (personNumRes !== true) {
        // Error
        return personNumRes
      }

      // Get current date
      const formattedCurrentDate = dateFormatted(new Date())

      const narvaroDateRes = await getNarvaroDate(formattedCurrentDate, personNumToSubmit)
      if (narvaroDateRes.data?.length > 0) {
        return 'Personnummret är redan anmält idag.'
      }

      const memberRes = await getMember(personNumToSubmit)
      if (memberRes.data.status === 'success' && memberRes.data.length > 0) {
        this.firstName = memberRes.data.data[0].first_name
        this.lastName = memberRes.data.data[0].last_name
        this.membershipEndDate = memberRes.data.data[0].end_date
      } else {
        this.membershipEndDate = null
      }

      this.personNum = personNumToSubmit
      return true
    },

    clearInputs() {
      this.personNum = null
      this.firstName = null
      this.lastName = null
      this.type = null
      this.hasLicense = false
      this.membershipEndDate = null
    }
  }
})
