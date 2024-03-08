<script>
import { RouterLink } from 'vue-router'

export default {
  data() {
    return {}
  },

  created() {}
}
</script>

<template>
  <main>
    <h1 class="mb--big">Kör försiktigt!</h1>

    <nav>
      <RouterLink class="btn--primary" :to="{ name: 'addNarvaro' }">Ny anmälan</RouterLink>
    </nav>

    <img clas="mt--big" src="@/assets/images/MHF-Ungdom-logo.png" alt="MHF Ungdom logga." />
  </main>
</template>

<style scoped>
h1 {
  font-size: 6rem;
}
</style>
