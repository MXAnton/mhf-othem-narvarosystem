<script>
import { RouterLink } from 'vue-router'

import HeaderComp from '@/components/HeaderComp.vue'
import InactivityComp from '@/components/InactivityComp.vue'

import { useAddNarvaroStore } from '@/stores/addNarvaro'
import { needsToPay } from '@/helpers'

export default {
  components: {
    HeaderComp,
    InactivityComp
  },

  data() {
    return {
      addNarvaroStore: null,
      weekDayIndex: null,
      weekDays: [
        'söndagar',
        'måndagar',
        'tisdagar',
        'onsdagar',
        'torsdagar',
        'fredagar',
        'lördagar'
      ]
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()

    this.weekDayIndex = new Date().getDay()

    if (
      !needsToPay(
        this.addNarvaroStore.type,
        this.addNarvaroStore.isActiveMember,
        this.addNarvaroStore.needLicense
      )
    ) {
      this.$router.push({ name: 'narvaroThanks' })
      return
    }

    // Inputs not needed anymore, clear them so noone can access them later
    this.addNarvaroStore.clearInputs()
  }
}
</script>

<template>
  <HeaderComp :progress="1" />

  <main>
    <h1 class="sub-header">En sista grej...</h1>
    <h2 class="mb--big">Betala</h2>

    <div class="price-text">
      På {{ weekDays[weekDayIndex] }} gäller 50 kr träningsavgift.
      <p v-if="weekDayIndex === 1"><i>TIPS: MHF-medlemmar tränar gratis på måndagar ;)</i></p>
    </div>

    <div class="img-wrapper">
      <img src="@/assets/images/MHF-Ungdom-logo.png" alt="MHF Ungdom logga." />
    </div>

    <RouterLink class="btn--primary mt--big" :to="{ name: 'narvaroThanks' }">Färdig</RouterLink>
  </main>

  <InactivityComp />
</template>

<style scoped>
.price-text {
  font-size: 1rem;
  text-align: center;

  margin-bottom: 1em;
}

.price-text p {
  line-height: 1.2;
}
.price-text p:last-child {
  margin-top: 0.3em;
}
.price-text i {
  font-style: italic;
  font-weight: 300;
}
</style>
