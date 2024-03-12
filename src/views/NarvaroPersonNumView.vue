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
      addNarvaroStore: null
    }
  },

  methods: {
    cancel() {
      this.addNarvaroStore.clearInputs()
      this.$router.push({ name: 'addNarvaro' })
    },
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

    if (this.addNarvaroStore.isPersonNumValid !== true) {
      this.$router.push({ name: 'addNarvaro' })
    }
  }
}
</script>

<template>
  <HeaderComp :progress="0.1" />

  <main>
    <h1 class="mb--big">Ändra personnummer</h1>

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
            v-model="addNarvaroStore.personNum"
          />
        </div>

        <nav>
          <!-- <input type="button" value="Avbryt" class="btn--primary btn--danger" @click="cancel" /> -->
          <input
            :disabled="addNarvaroStore.personNum == null || addNarvaroStore.personNum.length < 12"
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
#personnummer-input {
  font-size: 4rem;
  text-align: center;
  width: 8em;
}
</style>
