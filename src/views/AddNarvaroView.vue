<script>
import { RouterLink } from 'vue-router'
import { useAddNarvaroStore } from '@/stores/addNarvaro'

export default {
  data() {
    return {
      addNarvaroStore: null
    }
  },

  methods: {
    onSubmit(_event) {
      const personNumRes = this.addNarvaroStore.isPersonNumValid
      if (personNumRes !== true) {
        // Error
        console.warn(personNumRes)
        alert(personNumRes)
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
        <div class="input--primary__wrapper">
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
          />
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
