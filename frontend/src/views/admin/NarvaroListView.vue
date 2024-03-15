<script>
import HeaderBackComp from '@/components/HeaderBackComp.vue'

import { getAllNarvaroDate } from '@/services/narvaroService'

import { dateFormatted, personNumFormatted } from '@/helpers'

export default {
  components: { HeaderBackComp },
  data() {
    return {
      minDate: '2023-01-01',
      maxDate: '2023-12-31',
      date: null,
      narvaroList: null
    }
  },

  methods: {
    personNumFormatted,

    async changedDate() {
      // Clamp myDate to the range [minDate, maxDate]
      if (this.date < this.minDate) {
        this.date = this.minDate
      } else if (this.date > this.maxDate) {
        this.date = this.maxDate
      }

      await this.getNarvaro()
    },

    async getNarvaro() {
      const res = await getAllNarvaroDate(this.date)
      if (res == null) {
        this.narvaroList = null
        return
      }

      this.narvaroList = res.data.data
    }
  },

  async created() {
    const currentDate = new Date()
    this.maxDate = dateFormatted(currentDate)

    this.date = this.maxDate

    await this.getNarvaro()
  }
}
</script>

<template>
  <HeaderBackComp :backToPath="'/admin'" />

  <main>
    <h1>Närvarolista {{ date }}</h1>

    <nav class="date-nav">
      <label for="date-input">Välj datum:</label>
      <input
        type="date"
        name="date-input"
        id="date-input"
        required
        :min="minDate"
        :max="maxDate"
        v-model="date"
        @change="changedDate"
      />
    </nav>

    <table>
      <tr>
        <th>Id:</th>
        <th>Personnummer:</th>
        <th>Förnamn:</th>
        <th>Efternamn:</th>
        <th>Typ:</th>
        <th>Har licens:</th>
      </tr>
      <tr v-for="row in narvaroList" :key="row.id">
        <td>{{ row.id }}</td>
        <td>{{ personNumFormatted(row.personnummer) }}</td>
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

.date-nav {
  font-size: 1rem;

  margin-top: 0.4em;
  margin-bottom: 0.8em;

  display: flex;
  align-items: center;
  gap: 0.5em;
}
.date-nav label {
  font-size: 1em;
}
.date-nav input {
  font-size: 1em;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: max-content;
  max-width: 100%;
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
