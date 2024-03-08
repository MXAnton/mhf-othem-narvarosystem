<script>
import { useAddNarvaroStore } from '@/stores/addNarvaro'

export default {
  data() {
    return {
      addNarvaroStore: null
    }
  },

  methods: {
    cancel() {
      this.addNarvaroStore.clearInputs()
      this.$router.push({ name: 'addNarvaro' })
    },
    onSubmit(_event) {
      this.$router.push({ name: 'narvaroName' })
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()
  }
}
</script>

<template>
  <main>
    <h1 class="mb--big">Ändra personnummer</h1>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit">
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
            v-model="addNarvaroStore.personNum"
          />
        </div>

        <nav>
          <!-- <input type="button" value="Avbryt" class="btn--primary btn--danger" @click="cancel" /> -->
          <input type="submit" value="Fortsätt" class="btn--primary" />
        </nav>
      </form>
    </div>
  </main>
</template>

<style scoped>
#personnummer-input {
  font-size: 4rem;
  text-align: center;
  width: 8em;
}
</style>
