<script>
import { RouterLink } from 'vue-router'
import { useAddNarvaroStore } from '@/stores/addNarvaro'

import { getNarvaroDate } from '@/services/narvaroService'

export default {
  data() {
    return {
      addNarvaroStore: null,
      errorText: null
    }
  },

  methods: {
    async onSubmit(_event) {
      const personNumRes = this.addNarvaroStore.isPersonNumValid()
      if (personNumRes !== true) {
        // Error
        this.errorText = personNumRes
        return
      }

      // Get current date
      const currentDate = new Date()
      // Get current year, month, and day
      const year = currentDate.getFullYear()
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Adding 1 because months are zero-indexed
      const day = currentDate.getDate().toString().padStart(2, '0')
      // Construct the date string in the desired format
      const formattedDate = `${year}-${month}-${day}`

      const res = await getNarvaroDate(formattedDate, this.addNarvaroStore.personNum)
      if (res.data.length > 0) {
        this.errorText = 'Personnummret är redan anmält idag.'
        return
      }

      this.$router.push({ name: 'narvaroName' })
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()
    this.addNarvaroStore.clearInputs()
  },

  mounted() {
    this.$refs.autofocus.focus()
    this.$refs.autofocus.select()
  }
}
</script>

<template>
  <main>
    <h1 class="sub-header">Välkommen!</h1>
    <h2 class="mb--big">Anmäl dig nedan</h2>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit" novalidate>
        <div class="input--primary__wrapper" :class="{ error: errorText != null }">
          <label for="personnummer-input">Personnummer:</label>
          <input
            class="input--primary"
            type="text"
            id="personnummer-input"
            name="personnummer-input"
            size="12"
            minlength="12"
            maxlength="12"
            required
            pattern="[0-9]+"
            title="12 siffror, ÅÅÅÅMMDDXXXX"
            placeholder="ÅÅÅÅMMDDXXXX"
            autofocus
            ref="autofocus"
            v-model="addNarvaroStore.personNum"
            @input="errorText = null"
          />
          <label for="personnummer-input" class="error-text">{{ errorText }}</label>
        </div>

        <p>
          Genom att fortsätta godkänner du att vi hanterar dina personuppgifter enligt GDPR, läs mer
          <RouterLink to="/gdpr" class="link--primary">här</RouterLink>.
        </p>

        <input
          :disabled="addNarvaroStore.personNum == null || addNarvaroStore.personNum.length < 1"
          type="submit"
          value="Anmäl"
          class="btn--primary"
        />
      </form>
    </div>

    <img class="mt--bigger" src="@/assets/images/MHF-Ungdom-logo.png" alt="MHF Ungdom logga." />
  </main>
</template>

<style scoped>
h2 {
  font-size: 5rem;
}

#personnummer-input {
  font-size: 4rem;
  text-align: center;
  width: 8em;
}

.btn--primary {
  font-size: 2.5rem;
}
</style>
