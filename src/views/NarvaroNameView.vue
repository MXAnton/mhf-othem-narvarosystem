<script>
import HeaderComp from '@/components/HeaderComp.vue'
import TimeOutComp from '@/components/TimeOutComp.vue'
import { useAddNarvaroStore } from '@/stores/addNarvaro'

export default {
  components: {
    HeaderComp,
    TimeOutComp
  },

  data() {
    return {
      addNarvaroStore: null,
      errorText: null
    }
  },

  methods: {
    goBack() {
      this.$router.push({ name: 'narvaroPersonNum' })
    },
    onSubmit(_event) {
      const nameRes = this.addNarvaroStore.isNameValid
      if (nameRes !== true) {
        // Error
        console.warn(nameRes)
        this.errorText = nameRes
        return
      }

      this.$router.push({ name: 'narvaroType' })
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()

    if (this.addNarvaroStore.isPersonNumValid !== true) {
      this.$router.push({ name: 'addNarvaro' })
    }
  },

  mounted() {
    this.$refs.autofocus.focus()
    this.$refs.autofocus.select()
  }
}
</script>

<template>
  <HeaderComp :progress="0.3" />

  <main>
    <h1 class="mb--big">Skriv ditt namn</h1>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit()" novalidate>
        <div
          class="input--primary__wrapper"
          :class="{ error: errorText != null && errorText.includes('förnamn') }"
        >
          <label for="first-name-input">Förnamn:</label>
          <input
            class="input--primary"
            type="text"
            id="first-name-input"
            name="first-name-input"
            minlength="1"
            maxlength="50"
            required
            title="Skriv ditt förnamn..."
            placeholder="Förnamn..."
            autofocus
            ref="autofocus"
            v-model="addNarvaroStore.firstName"
            @input="errorText = null"
          />
          <label for="first-name-input" class="error-text">{{
            errorText != null && errorText.includes('förnamn') ? errorText : ''
          }}</label>
        </div>

        <div
          class="input--primary__wrapper"
          :class="{ error: errorText != null && errorText.includes('efternamn') }"
        >
          <label for="last-name-input">Efternamn:</label>
          <input
            class="input--primary"
            type="text"
            id="last-name-input"
            name="last-name-input"
            minlength="1"
            maxlength="50"
            required
            title="Skriv ditt efternamn..."
            placeholder="Efternamn..."
            v-model="addNarvaroStore.lastName"
            @input="errorText = null"
          />
          <label for="first-name-input" class="error-text">{{
            errorText != null && errorText.includes('efternamn') ? errorText : ''
          }}</label>
        </div>

        <nav>
          <input type="button" value="Tillbaka" class="btn--secondary" @click="goBack" />
          <input
            :disabled="
              addNarvaroStore.firstName == null ||
              addNarvaroStore.firstName.length == 0 ||
              addNarvaroStore.lastName == null ||
              addNarvaroStore.lastName.length == 0
            "
            type="submit"
            value="Fortsätt"
            class="btn--primary"
          />
        </nav>
      </form>
    </div>
  </main>

  <TimeOutComp />
</template>

<style scoped>
form {
  gap: 0.5rem;
}
form > * {
  width: 100%;
}
</style>
