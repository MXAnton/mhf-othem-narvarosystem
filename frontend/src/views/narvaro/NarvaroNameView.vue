<script>
import HeaderComp from '@/components/HeaderComp.vue'
import InactivityComp from '@/components/InactivityComp.vue'
import { useAddNarvaroStore } from '@/stores/addNarvaro'

import { getMember } from '@/services/memberService'
import { isNamesValid, isPersonNumValid } from '@/helpers'

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
    goBack() {
      this.$router.push({ name: 'narvaroEditPersonNum' })
    },
    onSubmit(_event) {
      const nameRes = isNamesValid(this.addNarvaroStore.firstName, this.addNarvaroStore.lastName)
      if (nameRes !== true) {
        // Error
        this.errorText = nameRes
        return
      }

      this.$router.push({ name: 'narvaroType' })
    }
  },

  async created() {
    this.addNarvaroStore = useAddNarvaroStore()

    if (isPersonNumValid(this.addNarvaroStore.personNum) !== true) {
      this.$router.push({ name: 'narvaroNew' })
    }

    const memberRes = await getMember(this.addNarvaroStore.personNum)
    if (memberRes.data?.status === 'success' && memberRes.data?.length > 0) {
      if (memberRes.data.data[0].first_name?.length === 0) {
        this.addNarvaroStore.firstName = memberRes.data.data[0].first_name
      }
      if (memberRes.data.data[0].last_name?.length === 0) {
        this.addNarvaroStore.lastName = memberRes.data.data[0].last_name
      }
      this.addNarvaroStore.membershipEndDate = memberRes.data.data[0].end_date
    } else if (memberRes.name === 'AxiosError') {
      this.addNarvaroStore.membershipEndDate = null
      this.$router.push({ name: 'narvaroNew' })
    } else {
      this.addNarvaroStore.membershipEndDate = null
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

  <InactivityComp />
</template>

<style scoped>
form {
  gap: 0.5rem;
}
form > * {
  width: 100%;
}
</style>
