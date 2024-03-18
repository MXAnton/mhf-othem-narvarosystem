<script>
import { RouterLink } from 'vue-router'
import { useAddNarvaroStore } from '@/stores/addNarvaro'

import { getNarvaroAmountToday } from '@/services/narvaroService'

export default {
  data() {
    return {
      addNarvaroStore: null,
      errorText: null,
      narvaroAmountToday: 0
    }
  },

  methods: {
    async onSubmit(_event) {
      const submitRes = await this.addNarvaroStore.submitPersonNum()
      if (submitRes !== true) {
        // Error
        this.errorText = submitRes
        return
      }

      if (this.addNarvaroStore.membershipEndDate != null) {
        this.$router.push({ name: 'narvaroType' })
      } else {
        this.$router.push({ name: 'narvaroName' })
      }
    }
  },

  async created() {
    this.addNarvaroStore = useAddNarvaroStore()
    this.addNarvaroStore.clearInputs()

    const narvaroAmountRes = await getNarvaroAmountToday()
    this.narvaroAmountToday = narvaroAmountRes?.data?.length || 0
  },

  mounted() {
    this.$refs.autofocus.focus()
    this.$refs.autofocus.select()
  }
}
</script>

<template>
  <main>
    <h1 class="sub-header">
      Välkommen! <span>{{ narvaroAmountToday }}st anmälda idag</span>
    </h1>
    <h2 class="mb--big">Anmäl dig nedan</h2>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit" novalidate>
        <div
          class="input--primary__wrapper personnummer-input"
          :class="{ error: errorText != null }"
        >
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

    <div class="img-wrapper mt--bigger">
      <img src="@/assets/images/MHF-Ungdom-logo.png" alt="MHF Ungdom logga." />
    </div>
  </main>
</template>

<style scoped>
h2 {
  font-size: 5rem;
}

.personnummer-input {
  font-size: 4rem;
}

.btn--primary {
  font-size: 2.5rem;
}

@media (max-width: 600px) {
  h2 {
    font-size: 4rem;
  }
  .personnummer-input {
    font-size: 3rem;
  }
}
</style>
