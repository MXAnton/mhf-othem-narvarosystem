<script>
import HeaderBackComp from '@/components/HeaderBackComp.vue'
import MemberFormDialog from '@/components/MemberFormDialog.vue'

import { createMember, deleteMember, getAllMembers, updateMember } from '@/services/memberService'

import { dateFormatted, personNumFormatted, isNamesValid, isPersonNumValid } from '@/helpers'

export default {
  components: { HeaderBackComp, MemberFormDialog },
  data() {
    return {
      membersList: null,

      lastSortBy: {
        column: '',
        ascending: true
      },

      editedMember: {
        id: null,
        personNum: null,
        firstName: null,
        lastName: null,
        endDate: null
      },
      editedMemberErrorText: null,

      newMember: {
        personNum: null,
        firstName: null,
        lastName: null,
        endDate: null
      },
      newMemberErrorText: null,

      sending: false,
      sendingAnimIntervalId: null,
      sendingAnimState: 0
    }
  },

  methods: {
    dateFormatted,
    personNumFormatted,

    async getMembers() {
      const res = await getAllMembers()
      if (res == null) {
        this.membersList = null
        return
      }

      this.membersList = res.data.data

      this.lastSortBy.column = 'personNum'
      this.lastSortBy.ascending = true
      this.sortByColumn('personNum')
    },

    sortByColumn(_column) {
      if (this.lastSortBy.column === _column) {
        this.lastSortBy.ascending = !this.lastSortBy.ascending
      } else {
        this.lastSortBy.ascending = true
      }

      switch (_column) {
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
          // Sort the array of objects by the 'personNum' property
          this.membersList.sort((a, b) => a.personnummer.localeCompare(b.personnummer))
          break
      }

      if (!this.lastSortBy.ascending) {
        this.membersList.reverse()
      }

      this.lastSortBy.column = _column
    },

    async deleteMember(_personnummer) {
      if (confirm('Är du säker du vill RADERA denna medlem PERMANENT?')) {
        this.startSending()

        await deleteMember(_personnummer)

        this.getMembers()

        this.$refs.editMemberModal.closeModal()

        this.stopSending()
      }
    },

    openEditMember(_member) {
      this.editedMember.id = _member.id
      this.editedMember.personNum = _member.personnummer
      this.editedMember.firstName = _member.first_name
      this.editedMember.lastName = _member.last_name
      this.editedMember.endDate = dateFormatted(new Date(_member.end_date))

      this.$refs.editMemberModal.openModal()
    },
    async updateMember() {
      this.startSending()

      // Check personNum
      const isPersunNumValidRes = isPersonNumValid(this.editedMember.personNum)
      if (isPersunNumValidRes !== true) {
        this.setEditedMemberError(isPersunNumValidRes)
        return
      }

      // Check names
      const isNamesValidRes = isNamesValid(this.editedMember.firstName, this.editedMember.lastName)
      if (isNamesValidRes !== true) {
        this.setEditedMemberError(isNamesValidRes)
        return
      }
      this.editedMember.firstName = this.editedMember.firstName.trim()
      this.editedMember.lastName = this.editedMember.lastName.trim()

      const createRes = await updateMember(
        this.editedMember.personNum,
        this.editedMember.firstName,
        this.editedMember.lastName,
        this.editedMember.endDate
      )
      if (createRes == null) {
        this.setEditedMemberError('Oväntat fel')
        return
      }
      if (createRes.data?.status !== 'success') {
        this.setEditedMemberError(createRes.response?.data?.message)
        return
      }

      this.getMembers()
      this.$refs.editMemberModal.closeModal()

      this.stopSending()
    },
    setEditedMemberError(_error) {
      this.editedMemberErrorText = _error
      this.stopSending()
    },

    async addNewMember() {
      this.startSending()

      // Check personNum
      const isPersunNumValidRes = isPersonNumValid(this.newMember.personNum)
      if (isPersunNumValidRes !== true) {
        this.setNewMemberError(isPersunNumValidRes)
        return
      }

      // Check names
      const isNamesValidRes = isNamesValid(this.newMember.firstName, this.newMember.lastName)
      if (isNamesValidRes !== true) {
        this.setNewMemberError(isNamesValidRes)
        return
      }
      this.newMember.firstName = this.newMember.firstName.trim()
      this.newMember.lastName = this.newMember.lastName.trim()

      const createRes = await createMember(
        this.newMember.personNum,
        this.newMember.firstName,
        this.newMember.lastName,
        this.newMember.endDate
      )
      if (createRes == null) {
        this.setNewMemberError('Oväntat fel')
        return
      }
      if (createRes.data?.status !== 'success') {
        this.setNewMemberError(createRes.response?.data?.message)
        return
      }

      this.resetNewMember()
      this.getMembers()
      this.$refs.newMemberModal.closeModal()

      this.stopSending()
    },
    resetNewMember() {
      this.newMember = {
        personNum: null,
        firstName: null,
        lastName: null,
        endDate: null
      }
      this.newMemberErrorText = null
    },
    setNewMemberError(_error) {
      this.newMemberErrorText = _error
      this.stopSending()
    },

    startSending() {
      this.sending = true

      this.sendingAnimState = 0

      this.sendingAnimIntervalId = setInterval(() => {
        if (this.sendingAnimState + 1 > 3) {
          this.sendingAnimState = 0
        } else {
          this.sendingAnimState++
        }
      }, 200)
    },
    stopSending() {
      this.sending = false

      clearInterval(this.sendingAnimIntervalId)
      this.sendingAnimIntervalId = null
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

    <nav class="mb--small">
      <button class="btn--primary" @click="$refs.newMemberModal.openModal">Lägg till medlem</button>
    </nav>

    <table>
      <tr>
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
      <tr v-if="sending === true" class="sending">
        <td colspan="4">
          <p>Laddar{{ '.'.repeat(sendingAnimState) }}</p>
        </td>
      </tr>
      <tr v-else v-for="row in membersList" :key="row.personnummer">
        <td>{{ personNumFormatted(row.personnummer) }}</td>
        <td>{{ row.first_name }}</td>
        <td>{{ row.last_name }}</td>
        <td>{{ dateFormatted(new Date(row.end_date)) }}</td>
        <td class="column--edit">
          <button @click="openEditMember(row)">✎</button>
        </td>
      </tr>
    </table>
  </main>

  <MemberFormDialog
    ref="newMemberModal"
    :idStart="'new'"
    :header="'Ny medlem'"
    :errorText="newMemberErrorText"
    :member="newMember"
    @submitForm="addNewMember()"
    @changedInput="newMemberErrorText = null"
    :sending="sending"
  >
    <input
      type="button"
      value="Avbryt"
      class="btn--secondary size--small"
      @click="$refs.newMemberModal.closeModal"
    />
  </MemberFormDialog>

  <MemberFormDialog
    ref="editMemberModal"
    :idStart="'edit'"
    :header="'Redigera medlem'"
    :submitText="'Spara'"
    :errorText="editedMemberErrorText"
    :member="editedMember"
    @submitForm="updateMember()"
    @changedInput="editedMemberErrorText = null"
    :sending="sending"
    ><input
      type="button"
      value="Radera"
      class="btn--primary size--small btn--danger"
      @click="deleteMember(editedMember.personNum)"
  /></MemberFormDialog>
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

  min-width: 2em;

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

.sending p {
  text-align: center;
  font-size: 2em;
}
</style>
