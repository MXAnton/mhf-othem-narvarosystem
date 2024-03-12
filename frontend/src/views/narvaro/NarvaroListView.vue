<script>
import { getAllNarvaroYear } from '@/services/narvaroService'

export default {
  data() {
    return {
      minYear: 2024,
      maxYear: new Date().getFullYear(),
      year: new Date().getFullYear(),
      narvaroList: null
    }
  },

  methods: {
    formattedPersonNum(_personNum) {
      return _personNum.substring(0, 8) + '-' + _personNum.substring(8)
    },

    async changedYear() {
      this.year = Math.max(this.minYear, Math.min(this.maxYear, this.year))

      await this.getNarvaro()
    },

    async getNarvaro() {
      const res = await getAllNarvaroYear(this.year)
      if (res == null) {
        this.narvaroList = null
        return
      }

      this.narvaroList = res.data.data
    }
  },

  async created() {
    await this.getNarvaro()
  }
}
</script>

<template>
  <header>
    <RouterLink to="/">< Tillbaka</RouterLink>
  </header>

  <main>
    <h1>Närvarolista {{ year }}</h1>

    <nav class="year-nav">
      <label for="year-input">Välj år:</label>
      <input
        type="number"
        name="year-input"
        id="year-input"
        :min="minYear"
        :max="maxYear"
        v-model="year"
        @change="changedYear"
      />
    </nav>

    <table>
      <tr>
        <th>Id:</th>
        <th>Datum:</th>
        <th>Personnummer:</th>
        <th>Förnamn:</th>
        <th>Efternamn:</th>
        <th>Typ:</th>
        <th>Har licens:</th>
      </tr>
      <tr v-for="row in narvaroList" :key="row.id">
        <td>{{ row.id }}</td>
        <td>{{ row.date }}</td>
        <td>{{ formattedPersonNum(row.personnummer) }}</td>
        <td>{{ row.first_name }}</td>
        <td>{{ row.last_name }}</td>
        <td>{{ row.type }}</td>
        <td>{{ row.has_license == 0 ? 'Nej' : 'Ja' }}</td>
      </tr>
    </table>
  </main>
</template>

<style scoped>
main {
  flex-grow: 1;
  justify-content: start;
}

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

.year-nav {
  font-size: 1rem;

  margin-top: 0.4em;
  margin-bottom: 0.8em;

  display: flex;
  align-items: center;
  gap: 0.5em;
}
.year-nav label {
  font-size: 1em;
}
.year-nav input {
  font-size: 1em;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  font-size: 1rem;
  border-left: 1px solid #c8c8c8;
  border-right: 1px solid #c8c8c8;
  border-top: 1px solid #727272;
  border-bottom: 1px solid #727272;
  text-align: left;
  padding: 0.5em;
}
th {
  font-weight: 600;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
