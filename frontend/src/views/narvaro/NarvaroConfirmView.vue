<script>
import HeaderComp from '@/components/HeaderComp.vue'
import InactivityComp from '@/components/InactivityComp.vue'

import { useAddNarvaroStore } from '@/stores/addNarvaro'

import { createNarvaro } from '@/services/narvaroService'
import { personNumFormatted, isNamesValid, isPersonNumValid, needsToPay } from '@/helpers'

export default {
  components: {
    HeaderComp,
    InactivityComp
  },

  data() {
    return {
      addNarvaroStore: null
    }
  },

  methods: {
    personNumFormatted,

    goBack() {
      if (this.addNarvaroStore.needLicense) {
        this.$router.push({ name: 'narvaroLicense' })
        return
      }
      this.$router.push({ name: 'narvaroType' })
    },
    async onSubmit(_event) {
      // Add narvaro to database
      const res = await createNarvaro(
        this.addNarvaroStore.personNum,
        this.addNarvaroStore.firstName,
        this.addNarvaroStore.lastName,
        this.addNarvaroStore.type,
        this.addNarvaroStore.hasLicense
      )
      if (res.name == 'AxiosError') {
        if (res.response.data.message.includes('Error: Duplicate entry')) {
          alert('Du är redan anmäld idag.')
          this.$router.push({ name: 'narvaroThanks' })
          return
        }
        alert(res.response.data.message)
        return
      }

      // Push to next route
      if (
        !needsToPay(
          this.addNarvaroStore.type,
          this.addNarvaroStore.isActiveMember,
          this.addNarvaroStore.needLicense
        )
      ) {
        const isOldMember = this.addNarvaroStore.isOldMember
        this.addNarvaroStore.clearInputs()
        this.$router.push({
          name: 'narvaroThanks',
          query: { isOldMember: isOldMember }
        })
        return
      }
      this.$router.push({ name: 'narvaroPay' })
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()

    if (isPersonNumValid(this.addNarvaroStore.personNum) !== true) {
      this.$router.push({ name: 'narvaroNew' })
    }
    if (isNamesValid(this.addNarvaroStore.firstName, this.addNarvaroStore.lastName) !== true) {
      this.$router.push({ name: 'narvaroName' })
    }
    if (this.addNarvaroStore.type == null) {
      this.$router.push({ name: 'narvaroType' })
    }
  }
}
</script>

<template>
  <HeaderComp :progress="0.9" />

  <main>
    <h1 class="sub-header">Nästan klar...</h1>
    <h2 class="mb--big">Bekräfta uppgifterna</h2>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit()">
        <ul>
          <li>
            <h3>Personnummer:</h3>
            <p>{{ personNumFormatted(addNarvaroStore.personNum) }}</p>
          </li>
          <li>
            <h3>Förnamn:</h3>
            <p>{{ addNarvaroStore.firstName }}</p>
          </li>
          <li>
            <h3>Efternamn:</h3>
            <p>{{ addNarvaroStore.lastName }}</p>
          </li>
          <li>
            <h3>Typ:</h3>
            <p>{{ addNarvaroStore.type }}</p>
          </li>
          <li v-if="addNarvaroStore.needLicense">
            <h3>Har licens:</h3>
            <p>{{ addNarvaroStore.hasLicense ? 'Ja' : 'Nej' }}</p>
          </li>
        </ul>

        <nav>
          <input type="button" value="Tillbaka" class="btn--secondary" @click="goBack" />
          <input type="submit" value="Stämmer" class="btn--primary" />
        </nav>
      </form>
    </div>
  </main>

  <InactivityComp />
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

li > h3 {
  font-size: 1.5rem;
  font-weight: 600;
}

li > p {
  font-size: 2.25rem;
  line-height: 1.1;
}
</style>
