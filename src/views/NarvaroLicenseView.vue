<script>
import { RouterLink } from 'vue-router'
import { useAddNarvaroStore } from '@/stores/addNarvaro'

export default {
  data() {
    return {
      addNarvaroStore: null,

      hasLicense: false
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onSubmit(_event) {
      this.addNarvaroStore.hasLicense = this.hasLicense
      this.$router.push({ name: 'narvaroConfirmView' })
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()
    this.hasLicense = this.addNarvaroStore.hasLicense || false
  }
}
</script>

<template>
  <main>
    <h1 class="mb--big">Har du licens?</h1>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit()">
        <p>
          Du som i år fyller 13 år eller mer MÅSTE ha SVEMO-licens för att få köra annat än
          begränsad prova på körning på däckbanorna. Läs mer här eller fråga en ledare om du känner
          dig osäker.
        </p>

        <div class="checkbox--primary__wrapper mb--small">
          <input
            class="checkbox--primary"
            type="checkbox"
            id="has-license-input"
            name="is-member-input"
            title="Jag har licens"
            autofocus
            v-model="hasLicense"
          />
          <label for="has-license-input">Jag har licens</label>
        </div>

        <nav>
          <input type="button" value="Tillbaka" class="btn--primary" @click="goBack" />
          <input type="submit" value="Fortsätt" class="btn--primary" />
        </nav>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
