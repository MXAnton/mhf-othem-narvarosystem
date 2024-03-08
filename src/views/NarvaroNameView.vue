<script>
import { useAddNarvaroStore } from '@/stores/addNarvaro'

export default {
  data() {
    return {
      addNarvaroStore: null
    }
  },

  methods: {
    goBack() {
      this.$router.push({ name: 'narvaroPersonNum' })
    },
    onSubmit(_event) {
      this.$router.push({ name: 'narvaroMembership' })
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()
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
            v-model="addNarvaroStore.firstName"
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
            v-model="addNarvaroStore.lastName"
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
