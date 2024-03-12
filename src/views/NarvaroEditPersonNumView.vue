<script>
import HeaderComp from '@/components/HeaderComp.vue'
import InactivityComp from '@/components/InactivityComp.vue'
import { useAddNarvaroStore } from '@/stores/addNarvaro'

export default {
  components: {
    HeaderComp,
    InactivityComp
  },

  data() {
    return {
      addNarvaroStore: null,
      errorText: null
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
        this.errorText = personNumRes
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
  },

  mounted() {
    this.$refs.autofocus.focus()
    this.$refs.autofocus.select()
  }
}
</script>

<template>
  <HeaderComp :progress="0.1" />

  <main>
    <h1 class="mb--big">Ändra personnummer</h1>

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

        <nav>
          <!-- <input type="button" value="Avbryt" class="btn--primary btn--danger" @click="cancel" /> -->
          <input
            :disabled="addNarvaroStore.personNum == null || addNarvaroStore.personNum.length < 1"
            type="submit"
            value="Fortsätt"
            class="btn--primary"
          />
        </nav>
      </form>
    </div>
  </main>

  <InactivityComp />
</template>

<style scoped>
#personnummer-input {
  font-size: 4rem;
  text-align: center;
  width: 8em;
}
</style>
