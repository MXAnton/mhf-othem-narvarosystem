<script>
import TimeOutComp from '@/components/TimeOutComp.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    TimeOutComp
  }
}
</script>

<template>
  <main>
    <h1 class="mb--big">Kör försiktigt!</h1>

    <RouterLink class="btn--primary mb--bigger" :to="{ name: 'addNarvaro' }">Ny anmälan</RouterLink>

    <img src="@/assets/images/MHF-Ungdom-logo.png" alt="MHF Ungdom logga." />
  </main>

  <TimeOutComp />
</template>

<style scoped>
main {
  min-height: 90svh;
  justify-content: end;
}
h1 {
  font-size: 6rem;
}
</style>
