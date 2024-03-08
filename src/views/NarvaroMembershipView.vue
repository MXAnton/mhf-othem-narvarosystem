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
      this.$router.push({ name: 'narvaroName' })
    },
    onSubmit(_event) {
      this.$router.push({ name: 'narvaroType' })
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()
  }
}
</script>

<template>
  <main>
    <h1 class="mb--big">Medlem?</h1>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit()">
        <div>
          <div class="radio--primary__wrapper mb--small">
            <input
              class="radio--primary"
              type="radio"
              id="yes-input"
              name="is-member-input"
              required
              title="Jag är medlem"
              autofocus
              :value="true"
              v-model="addNarvaroStore.isMember"
            />
            <label for="yes-input">Ja</label>
          </div>
          <div class="radio--primary__wrapper">
            <input
              class="radio--primary"
              type="radio"
              id="no-input"
              name="is-member-input"
              required
              title="Jag är inte medlem"
              :value="false"
              v-model="addNarvaroStore.isMember"
            />
            <label for="no-input">Nej</label>
          </div>
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
