<script>
import { RouterLink } from 'vue-router'

import { useAdminStore } from '@/stores/admin'

export default {
  data() {
    return {
      addAdminStore: null,

      username: null,
      password: null,

      errorText: null
    }
  },

  methods: {
    inputChanged() {
      this.username = this.username?.trim()
      this.password = this.password?.trim()
      this.errorText = null
    },

    async onSubmit(_event) {
      const submitRes = await this.addAdminStore.login(this.username, this.password)
      if (submitRes !== true) {
        // Error
        this.errorText = submitRes
        return
      }

      this.username = null
      this.password = null
      alert('Du har loggat in')
    }
  },

  async created() {
    this.addAdminStore = useAdminStore()
  },

  mounted() {
    this.$refs.autofocus.focus()
    this.$refs.autofocus.select()
  }
}
</script>

<template>
  <header>
    <RouterLink to="/" class="link--primary">< Tillbaka</RouterLink>
  </header>

  <main>
    <h1 class="mb--big">Admin</h1>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit" novalidate>
        <div class="input--primary__wrapper" :class="{ error: errorText != null }">
          <label for="username-input">Användarnamn:</label>
          <input
            class="input--primary"
            type="text"
            id="username-input"
            name="username-input"
            minlength="4"
            maxlength="50"
            required
            title="Skriv ditt användarnamn..."
            autofocus
            ref="autofocus"
            v-model="username"
            @input="inputChanged"
          />
        </div>
        <div class="input--primary__wrapper" :class="{ error: errorText != null }">
          <label for="password-input">Lösenord:</label>
          <input
            class="input--primary"
            type="password"
            id="password-input"
            name="password-input"
            minlength="1"
            maxlength="50"
            required
            title="Skriv ditt lösenord..."
            v-model="password"
            @input="inputChanged"
          />
          <label for="username-input" class="error-text">{{ errorText }}</label>
        </div>

        <input
          :disabled="
            username == null || username?.length < 1 || password == null || password?.length < 1
          "
          type="submit"
          value="Logga in"
          class="btn--primary"
        />
      </form>
    </div>
  </main>
</template>

<style scoped></style>
