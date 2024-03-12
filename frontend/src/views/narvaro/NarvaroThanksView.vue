<script>
import InactivityComp from '@/components/InactivityComp.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    InactivityComp
  }
}
</script>

<template>
  <main>
    <h1 class="mb--big">Kör försiktigt!</h1>

    <RouterLink class="btn--primary mb--bigger" :to="{ name: 'narvaroNew' }">Ny anmälan</RouterLink>
  </main>

  <InactivityComp />
</template>

<style scoped>
main {
  min-height: 80svh;
}
</style>
