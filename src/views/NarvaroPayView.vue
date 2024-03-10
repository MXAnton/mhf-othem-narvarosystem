<script>
import HeaderComp from '@/components/HeaderComp.vue'
import { useAddNarvaroStore } from '@/stores/addNarvaro'
import { RouterLink } from 'vue-router'

export default {
  components: {
    HeaderComp
  },

  data() {
    return {
      addNarvaroStore: null,
      weekDayIndex: new Date().getDay() - 1,
      weekDays: [
        'måndagar',
        'tisdagar',
        'onsdagar',
        'torsdagar',
        'fredagar',
        'lördagar',
        'söndagar'
      ]
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()
  }
}
</script>

<template>
  <HeaderComp :progress="1" />

  <main>
    <h1 class="sub-header">En sista grej...</h1>
    <h2 class="mb--big">Betala</h2>

    <div class="price-text" v-if="weekDayIndex === 0">
      <p>På måndagar gäller 50 kr träningsavgift.</p>
      <p><i>TIPS: MHF-medlemmar tränar gratis på måndagar ;)</i></p>
    </div>
    <p class="price-text" v-else>På {{ weekDays[weekDayIndex] }} gäller 50 kr träningsavgift.</p>

    <img src="@/assets/images/MHF-Ungdom-logo.png" alt="MHF Ungdom logga." />

    <RouterLink class="btn--primary mt--big" :to="{ name: 'narvaroThanks' }">Färdig</RouterLink>
  </main>
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
