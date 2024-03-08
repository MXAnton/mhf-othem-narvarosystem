<script>
import { RouterLink } from 'vue-router'

export default {
  data() {
    return {
      firstName: null,
      lastName: null
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onSubmit(_event) {
      // this.$router.push({ name: 'narvaroName' })
    }
  }
}
</script>

<template>
  <main>
    <h1 class="mb--big">Skriv ditt namn</h1>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit()">
        <div class="input--primary__wrapper">
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
            v-model="firstName"
          />
        </div>

        <div class="input--primary__wrapper">
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
            autofocus
            v-model="lastName"
          />
        </div>

        <nav>
          <input type="button" value="Tillbaka" class="btn--primary" @click="goBack" />
          <input type="submit" value="Fortsätt" class="btn--primary" />
        </nav>
      </form>
    </div>
  </main>
</template>

<style scoped>
form > * {
  width: 100%;
}
</style>
