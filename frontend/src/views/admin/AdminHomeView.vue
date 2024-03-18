<script>
import HeaderBackComp from '@/components/HeaderBackComp.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    HeaderBackComp
  }
}
</script>

<template>
  <HeaderBackComp :backToText="'< Logga ut'" />

  <main>
    <h1 class="mb--big">Admin</h1>

    <nav>
      <ul>
        <li>
          <RouterLink to="/admin/narvarolista" class="btn--primary">Närvarolista</RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/medlemslista" class="btn--primary">Medlemslista</RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/ny" class="btn--primary">Lägg till admin</RouterLink>
        </li>
      </ul>
    </nav>
  </main>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
</style>
