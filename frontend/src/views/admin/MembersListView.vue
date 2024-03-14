<script>
import HeaderBackComp from '@/components/HeaderBackComp.vue'
import { deleteMember, getAllMembers } from '@/services/memberService'

export default {
  components: { HeaderBackComp },
  data() {
    return {
      membersList: null,

      lastSortBy: {
        column: '',
        ascending: true
      },

      currentEditId: null
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

      this.currentEditId = null
      this.lastSortBy.column = ''
      this.sortByColumn('firstName')
    },

    sortByColumn(_column) {
      if (this.lastSortBy.column === _column) {
        this.lastSortBy.ascending = !this.lastSortBy.ascending
      } else {
        this.lastSortBy.ascending = true
      }

      switch (_column) {
        case 'personNum':
          this.membersList.sort((a, b) => a.personnummer.localeCompare(b.personnummer))
          break
        case 'firstName':
          this.membersList.sort((a, b) => a.first_name.localeCompare(b.first_name))
          break
        case 'lastName':
          this.membersList.sort((a, b) => a.last_name.localeCompare(b.last_name))
          break
        case 'endDate':
          this.membersList.sort((a, b) => a.end_date.localeCompare(b.end_date))
          break
        default:
          // Sort the array of objects by the 'id' property
          this.membersList.sort((a, b) => {
            return a.id - b.id
          })
          break
      }

      if (!this.lastSortBy.ascending) {
        this.membersList.reverse()
      }

      this.lastSortBy.column = _column
    },

    saveMember(_id) {
      this.currentEditId = null
    },

    async deleteMember(_personnummer) {
      if (confirm('Är du säker du vill RADERA denna medlem PERMANENT?')) {
        await deleteMember(_personnummer)

        this.currentEditId = null

        this.getMembers()
      }
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
        <th
          :class="{
            asc: lastSortBy.ascending && lastSortBy.column === 'id',
            desc: !lastSortBy.ascending && lastSortBy.column === 'id'
          }"
        >
          <button @click="sortByColumn('id')">Id:</button>
        </th>
        <th
          :class="{
            asc: lastSortBy.ascending && lastSortBy.column === 'personNum',
            desc: !lastSortBy.ascending && lastSortBy.column === 'personNum'
          }"
        >
          <button @click="sortByColumn('personNum')">Personnummer:</button>
        </th>
        <th
          :class="{
            asc: lastSortBy.ascending && lastSortBy.column === 'firstName',
            desc: !lastSortBy.ascending && lastSortBy.column === 'firstName'
          }"
        >
          <button @click="sortByColumn('firstName')">Förnamn:</button>
        </th>
        <th
          :class="{
            asc: lastSortBy.ascending && lastSortBy.column === 'lastName',
            desc: !lastSortBy.ascending && lastSortBy.column === 'lastName'
          }"
        >
          <button @click="sortByColumn('lastName')">Efternamn:</button>
        </th>
        <th
          :class="{
            asc: lastSortBy.ascending && lastSortBy.column === 'endDate',
            desc: !lastSortBy.ascending && lastSortBy.column === 'endDate'
          }"
        >
          <button @click="sortByColumn('endDate')">Medlem t.o.m:</button>
        </th>
      </tr>
      <tr v-for="row in membersList" :key="row.id">
        <td>{{ row.id }}</td>
        <td>{{ formattedPersonNum(row.personnummer) }}</td>
        <td>{{ row.first_name }}</td>
        <td>{{ row.last_name }}</td>
        <td>{{ formattedDate(row.end_date) }}</td>
        <td v-if="currentEditId !== row.id" class="column--edit">
          <button @click="currentEditId = row.id">Edit</button>
        </td>
        <td v-else class="column--editing">
          <button @click="saveMember(row.id)">Save</button>
          <button @click="deleteMember(row.personnummer)" class="btn--danger">Delete</button>
        </td>
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
  width: max-content;
  max-width: 100%;
}

td {
  font-size: 1rem;
  border-left: 1px solid #c8c8c8;
  border-right: 1px solid #c8c8c8;
  border-top: 1px solid #727272;
  border-bottom: 1px solid #727272;
  text-align: left;
  padding: 0.5em;
}
th {
  padding: 0;
  border-left: 1px solid #c8c8c8;
  border-right: 1px solid #c8c8c8;
  border-top: 1px solid #727272;
  border-bottom: 1px solid #727272;
}
th > button {
  position: relative;

  font-size: 1rem;
  font-weight: 600;
  text-align: left;

  border: none;
  padding: 0.5em;
  padding-right: 1.5em;

  background: none;

  transition: background-color 0.2s ease-in-out;
}
th > button::after {
  content: '▶';

  font-size: 1em;
  position: absolute;
  right: 0.5em;

  transition: transform 0.1s ease-in-out;
}
th.desc > button::after {
  transform: rotate(-90deg);
}
th.asc > button::after {
  transform: rotate(90deg);
}
th > button:hover {
  background-color: #dddddd;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

td.column--edit,
td.column--editing {
  background-color: var(--color-bg);

  font-size: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.2em;

  min-width: 4em;

  padding: 0.2em 0;
  border: none;
}
td.column--editing {
  padding: 0.6em 0;
}
td.column--edit > button,
td.column--editing > button {
  width: 100%;
  font-size: 1em;
  padding: 0.4em;

  background-color: var(--color-btn-bg);
  color: white;
  border: none;
}
</style>
