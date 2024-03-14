<script>
import HeaderBackComp from '@/components/HeaderBackComp.vue'
import { getAllMembers } from '@/services/memberService'

export default {
  components: { HeaderBackComp },
  data() {
    return {
      membersList: null
    }
  },

  methods: {
    formattedPersonNum(_personNum) {
      return _personNum.substring(0, 8) + '-' + _personNum.substring(8)
    },

    formattedDate(_date) {
      const date = new Date(_date)
      return (
        date.getUTCFullYear() +
        '-' +
        (date.getUTCMonth() + 1).toString().padStart(2, '0') +
        '-' +
        (date.getUTCDate() + 1).toString().padStart(2, '0')
      )
    },

    async getMembers() {
      const res = await getAllMembers()
      if (res == null) {
        this.membersList = null
        return
      }

      this.membersList = res.data.data
    }
  },

  async created() {
    await this.getMembers()
  }
}
</script>

<template>
  <HeaderBackComp :backToPath="'/admin'" />

  <main>
    <h1 class="mb--small">Medlemslista</h1>

    <table>
      <tr>
        <th>Id:</th>
        <th>Personnummer:</th>
        <th>Förnamn:</th>
        <th>Efternamn:</th>
        <th>Medlem t.o.m:</th>
      </tr>
      <tr v-for="row in membersList" :key="row.id">
        <td>{{ row.id }}</td>
        <td>{{ formattedPersonNum(row.personnummer) }}</td>
        <td>{{ row.first_name }}</td>
        <td>{{ row.last_name }}</td>
        <td>{{ formattedDate(row.end_date) }}</td>
      </tr>
    </table>
  </main>
</template>

<style scoped>
main {
  flex-grow: 1;
  justify-content: start;
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
