<script>
import InactivityComp from '@/components/InactivityComp.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    InactivityComp
  },

  data() {
    return {
      testAmount: 0
    }
  },

  created() {
    this.testAmount = parseInt(this.$route.query.testAmount) || 0
  }
}
</script>

<template>
  <main>
    <h1>Kör försiktigt!</h1>
    <p class="mt--small" v-if="$route.query.isOldMember === 'true'">
      Ditt medlemskap har utgått <br />
      <span>(det kan ta ett tag innan det uppdateras i detta system)</span>
    </p>
    <p class="mt--small" v-if="testAmount != null && testAmount === 2">
      Det här är din 2a prova på körning i år. Nästa gång behöver du betala in medlemskap.
    </p>
    <p class="mt--small" v-else-if="testAmount != null && testAmount > 2">
      Det här är din {{ testAmount }}e prova på körning i år! Skaffa medlemskap snarast!
    </p>

    <RouterLink class="btn--primary mt--big" :to="{ name: 'narvaroNew' }">Ny anmälan</RouterLink>
  </main>

  <InactivityComp />
</template>

<style scoped>
main {
  min-height: 80svh;
}
p {
  font-size: 1.5rem;
  line-height: 0.9;
  font-style: italic;
  color: var(--c-red);
  text-align: center;
}
p > span {
  font-size: 0.8em;
}
</style>
