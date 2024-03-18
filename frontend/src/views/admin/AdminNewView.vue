<script>
import HeaderBackComp from '@/components/HeaderBackComp.vue'
import { createAdmin } from '@/services/adminService'

export default {
  components: { HeaderBackComp },
  data() {
    return {
      username: null,
      password: null,
      errorText: null,
      success: null
    }
  },

  methods: {
    inputChanged() {
      this.username = this.username?.trim()
      this.password = this.password?.trim()
      this.errorText = null
    },

    async onSubmit() {
      this.success = null

      const submitRes = await createAdmin(this.username, this.password)
      if (submitRes == null) {
        this.errorText = 'Oväntat fel'
        return
      }
      if (submitRes.data?.status !== 'success') {
        this.errorText = submitRes.response?.data?.message
        return
      }

      this.success = true
      this.resetForm()
    },
    resetForm() {
      this.username = null
      this.password = null
      this.errorText = null
    }
  },

  mounted() {
    this.$refs.autofocus.focus()
    this.$refs.autofocus.select()
  }
}
</script>

<template>
  <HeaderBackComp :backToPath="'/admin'" />

  <main>
    <h1 class="mb--big">Ny admin</h1>

    <div v-if="success !== true" class="content__wrapper">
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
          value="Lägg till"
          class="btn--primary"
        />
      </form>
    </div>
    <div v-else class="content__wrapper">
      <p class="sub-header mb--normal">Admin-kontot har lagts till.</p>

      <button class="btn--primary" @click="success = null">Lägg till ny</button>
    </div>
  </main>
</template>

<style scoped>
main {
  flex-grow: 1;
  justify-content: start;
}

.content__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
