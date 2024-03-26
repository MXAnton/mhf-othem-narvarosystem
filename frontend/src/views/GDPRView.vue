<script>
import { RouterLink } from 'vue-router'

import HeaderBackComp from '@/components/HeaderBackComp.vue'

export default {
  components: { HeaderBackComp }
}
</script>

<template>
  <HeaderBackComp />

  <main>
    <h1 class="mb--big">Personuppgifter</h1>

    <div class="content__wrapper">
      <p>Genom att fortsätta godkänner du att vi hanterar dina personuppgifter enligt GDPR.</p>
      <p>
        Vi använder dina personuppgifter för att rapportera in din närvaro hos oss till LOK-stöd för
        att kunna visa upp hur många som tar del av vår verksamhet och därmed få bidragen som gör
        att vi finns till.
      </p>
    </div>

    <div class="img-wrapper mt--bigger">
      <img src="@/assets/images/MHF-Ungdom-logo.png" alt="MHF Ungdom logga." />
    </div>
  </main>
</template>

<style scoped>
p {
  margin-bottom: 1em;
}
</style>
