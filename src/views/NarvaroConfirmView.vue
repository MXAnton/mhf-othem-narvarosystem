<script>
import { useAddNarvaroStore } from '@/stores/addNarvaro'

export default {
  data() {
    return {
      addNarvaroStore: null
    }
  },

  methods: {
    goBack() {
      this.$router.push({ name: 'narvaroLicense' })
    },
    onSubmit(_event) {
      // Add narvaro to database
      // this.$router.push({ name: 'narvaroType' })
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()
  }
}
</script>

<template>
  <main>
    <h1 class="sub-header">Nästan klar...</h1>
    <h2 class="mb--big">Bekräfta uppgifterna</h2>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit()">
        <ul>
          <li>
            <h3>Personnummer:</h3>
            <p>{{ addNarvaroStore.personNum }}</p>
          </li>
          <li>
            <h3>Förnamn:</h3>
            <p>{{ addNarvaroStore.firstName }}</p>
          </li>
          <li>
            <h3>Efternamn:</h3>
            <p>{{ addNarvaroStore.lastName }}</p>
          </li>
          <li>
            <h3>Typ:</h3>
            <p>{{ addNarvaroStore.type }}</p>
          </li>
          <li>
            <h3>Har licens:</h3>
            <p>{{ addNarvaroStore.hasLicense ? 'Ja' : 'Nej' }}</p>
          </li>
        </ul>

        <nav>
          <input type="button" value="Tillbaka" class="btn--primary" @click="goBack" />
          <input type="submit" value="Stämmer" class="btn--primary" />
        </nav>
      </form>
    </div>
  </main>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

li > h3 {
  font-size: 1.5rem;
  font-weight: 600;
}
li > p {
  font-size: 2.25rem;
  line-height: 1.1;
}
</style>
