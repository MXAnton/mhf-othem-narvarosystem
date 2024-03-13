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
      errorText: null,
      newPersonNum: null
    }
  },

  methods: {
    async onSubmit(_event) {
      const submitRes = await this.addNarvaroStore.submitPersonNum(this.newPersonNum)
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

  created() {
    this.addNarvaroStore = useAddNarvaroStore()

    if (this.addNarvaroStore.isPersonNumValid() !== true) {
      this.$router.push({ name: 'narvaroNew' })
    }

    this.newPersonNum = this.addNarvaroStore.personNum
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
            v-model="newPersonNum"
            @input="errorText = null"
          />
          <label for="personnummer-input" class="error-text">{{ errorText }}</label>
        </div>

        <nav>
          <input
            :disabled="newPersonNum == null || newPersonNum.length < 1"
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
@media (max-width: 600px) {
  #personnummer-input {
    font-size: 3rem;
  }
}
</style>
