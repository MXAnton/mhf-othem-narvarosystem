<script>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/">< Tillbaka</RouterLink>
  </header>

  <main>
    <h1 class="mb--big">Personuppgifter</h1>

    <div class="content__wrapper">
      <p>Genom att fortsätta godkänner du att vi hanterar dina personuppgifter enligt GDPR.</p>
      <p>Vi lagrar närvaron i en lokal databas, som inte går att komma åt utifrån.</p>
      <p>
        Vi använder dina personuppgifter för att rapportera in din närvaro hos oss till myndigheter
        för att kunna visa upp hur många som tar del av vår verksamhet och därmed få bidragen som
        gör att vi finns till.
      </p>
    </div>

    <img class="mt--bigger" src="@/assets/images/MHF-Ungdom-logo.png" alt="MHF Ungdom logga." />
  </main>
</template>

<style scoped>
header {
  width: 100%;
  padding: 1rem;
}
header a {
  font-weight: 500;
  text-decoration: none;
  font-size: 1rem;
  color: var(--color-text);
}

p {
  margin-bottom: 1em;
}
</style>
