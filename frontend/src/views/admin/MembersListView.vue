<script>
import HeaderBackComp from '@/components/HeaderBackComp.vue'
import { createMember, deleteMember, getAllMembers, updateMember } from '@/services/memberService'
import { useAddNarvaroStore } from '@/stores/addNarvaro'

export default {
  components: { HeaderBackComp },
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
      newMemberErrorText: null
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

      this.lastSortBy.column = 'id'
      this.lastSortBy.ascending = true
      this.sortByColumn('id')
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

    async deleteMember(_id) {
      if (confirm('Är du säker du vill RADERA denna medlem PERMANENT?')) {
        await deleteMember(_id)

        this.getMembers()

        this.closeEditMember()
      }
    },

    openEditMember(_member) {
      this.resetEditedMember()

      this.editedMember.id = _member.id
      this.editedMember.personNum = _member.personnummer
      this.editedMember.firstName = _member.first_name
      this.editedMember.lastName = _member.last_name
      this.editedMember.endDate = this.formattedDate(_member.end_date)

      const modal = this.$refs.editMemberDialog
      modal.showModal()

      modal.addEventListener('click', (_event) => {
        if (_event.target.tagName !== 'DIALOG')
          //This prevents issues with forms
          return

        const rect = _event.target.getBoundingClientRect()

        const clickedInDialog =
          rect.top <= _event.clientY &&
          _event.clientY <= rect.top + rect.height &&
          rect.left <= _event.clientX &&
          _event.clientX <= rect.left + rect.width

        if (clickedInDialog === false) {
          this.closeEditMember()
        }
      })
      modal.addEventListener('cancel', (event) => {
        this.closeEditMember()
      })
      modal.addEventListener('close', (event) => {
        this.closeEditMember()
      })
    },
    closeEditMember() {
      this.resetEditedMember()

      const modal = this.$refs.editMemberDialog
      modal.close()

      modal.removeEventListener('click', (_event) => {
        if (_event.target.tagName !== 'DIALOG')
          //This prevents issues with forms
          return

        const rect = _event.target.getBoundingClientRect()

        const clickedInDialog =
          rect.top <= _event.clientY &&
          _event.clientY <= rect.top + rect.height &&
          rect.left <= _event.clientX &&
          _event.clientX <= rect.left + rect.width

        if (clickedInDialog === false) {
          this.closeEditMember()
        }
      })
      modal.removeEventListener('cancel', (event) => {
        this.closeEditMember()
      })
      modal.removeEventListener('close', (event) => {
        this.closeEditMember()
      })
    },
    resetEditedMember() {
      this.editedMember = {
        id: null,
        personNum: null,
        firstName: null,
        lastName: null,
        endDate: null
      }
      this.editedMemberErrorText = null
    },
    async updateMember() {
      // Check personNum
      const isPersunNumValidRes = useAddNarvaroStore().isPersonNumValid(this.editedMember.personNum)
      if (isPersunNumValidRes !== true) {
        this.editedMemberErrorText = isPersunNumValidRes
        return
      }

      // Check names
      if (this.editedMember.firstName == null || this.editedMember.firstName.trim().length === 0) {
        this.editedMemberErrorText = 'Skriv in förnamn.'
        return
      }
      if (this.editedMember.lastName == null || this.editedMember.lastName.trim().length === 0) {
        this.editedMemberErrorText = 'Skriv in efternamn.'
        return
      }
      this.editedMember.firstName = this.editedMember.firstName.trim()
      this.editedMember.lastName = this.editedMember.lastName.trim()

      const createRes = await updateMember(
        this.editedMember.id,
        this.editedMember.personNum,
        this.editedMember.firstName,
        this.editedMember.lastName,
        this.editedMember.endDate
      )
      if (createRes == null) {
        this.editedMemberErrorText = 'Oväntat fel'
        return
      }
      if (createRes.data?.status !== 'success') {
        this.editedMemberErrorText = createRes.response?.data?.message
        return
      }

      this.getMembers()
      this.closeEditMember()
    },

    openAddNewMember() {
      const modal = this.$refs.addNewMemberDialog
      modal.showModal()
      modal.addEventListener('click', (_event) => {
        if (_event.target.tagName !== 'DIALOG')
          //This prevents issues with forms
          return

        const rect = _event.target.getBoundingClientRect()

        const clickedInDialog =
          rect.top <= _event.clientY &&
          _event.clientY <= rect.top + rect.height &&
          rect.left <= _event.clientX &&
          _event.clientX <= rect.left + rect.width

        if (clickedInDialog === false) {
          this.closeAddNewMember()
        }
      })
      modal.addEventListener('cancel', (event) => {
        this.closeAddNewMember()
      })
      modal.addEventListener('close', (event) => {
        this.closeAddNewMember()
      })
    },
    closeAddNewMember() {
      const modal = this.$refs.addNewMemberDialog
      modal.close()
      modal.removeEventListener('click', (_event) => {
        if (_event.target.tagName !== 'DIALOG')
          //This prevents issues with forms
          return

        const rect = _event.target.getBoundingClientRect()

        const clickedInDialog =
          rect.top <= _event.clientY &&
          _event.clientY <= rect.top + rect.height &&
          rect.left <= _event.clientX &&
          _event.clientX <= rect.left + rect.width

        if (clickedInDialog === false) {
          this.closeAddNewMember()
        }
      })
      modal.removeEventListener('cancel', (event) => {
        this.closeAddNewMember()
      })
      modal.removeEventListener('close', (event) => {
        this.closeAddNewMember()
      })
    },

    async addNewMember() {
      // Check personNum
      const isPersunNumValidRes = useAddNarvaroStore().isPersonNumValid(this.newMember.personNum)
      if (isPersunNumValidRes !== true) {
        this.newMemberErrorText = isPersunNumValidRes
        return
      }

      // Check names
      if (this.newMember.firstName == null || this.newMember.firstName.trim().length === 0) {
        this.newMemberErrorText = 'Skriv in förnamn.'
        return
      }
      if (this.newMember.lastName == null || this.newMember.lastName.trim().length === 0) {
        this.newMemberErrorText = 'Skriv in efternamn.'
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
        this.newMemberErrorText = 'Oväntat fel'
        return
      }
      if (createRes.data?.status !== 'success') {
        this.newMemberErrorText = createRes.response?.data?.message
        return
      }

      this.resetNewMember()
      this.getMembers()
      this.closeAddNewMember()
    },

    resetNewMember() {
      this.newMember = {
        personNum: null,
        firstName: null,
        lastName: null,
        endDate: null
      }
      this.newMemberErrorText = null
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
      <button class="btn--primary" @click="openAddNewMember">Lägg till medlem</button>
    </nav>

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
        <td class="column--edit">
          <button @click="openEditMember(row)">✎</button>
        </td>
        <!-- <td v-else class="column--editing">
          <button @click="saveMember(row.id)">Save</button>
          <button @click="deleteMember(row.personnummer)" class="btn--danger">Delete</button>
        </td> -->
      </tr>
    </table>
  </main>

  <dialog ref="addNewMemberDialog">
    <form class="new-member-form" @submit.prevent="addNewMember()" novalidate>
      <h2 class="size--normal">Ny medlem</h2>

      <div
        class="input--primary__wrapper size--small"
        :class="{ error: newMemberErrorText != null }"
      >
        <label for="personnummer-input">Personnummer:</label>
        <input
          class="input--primary"
          type="text"
          id="personnummer-input"
          name="personnummer-input"
          size="12"
          minlength="12"
          maxlength="12"
          required
          autofocus
          pattern="[0-9]+"
          title="12 siffror, ÅÅÅÅMMDDXXXX"
          placeholder="ÅÅÅÅMMDDXXXX"
          v-model="newMember.personNum"
          @input="newMemberErrorText = null"
        />
      </div>

      <div
        class="input--primary__wrapper size--small"
        :class="{ error: newMemberErrorText != null }"
      >
        <label for="first-name-input">Förnamn:</label>
        <input
          class="input--primary"
          type="text"
          id="first-name-input"
          name="first-name-input"
          minlength="1"
          maxlength="50"
          required
          title="Skriv förnamn..."
          v-model="newMember.firstName"
          @input="newMemberErrorText = null"
        />
      </div>

      <div
        class="input--primary__wrapper size--small"
        :class="{ error: newMemberErrorText != null }"
      >
        <label for="last-name-input">Efternamn:</label>
        <input
          class="input--primary"
          type="text"
          id="last-name-input"
          name="last-name-input"
          minlength="1"
          maxlength="50"
          required
          title="Skriv efternamn..."
          v-model="newMember.lastName"
          @input="newMemberErrorText = null"
        />
      </div>

      <div
        class="input--primary__wrapper size--small"
        :class="{ error: newMemberErrorText != null }"
      >
        <label for="date-input">Medlem t.o.m:</label>
        <input
          class="input--primary"
          type="date"
          name="date-input"
          id="date-input"
          required
          v-model="newMember.endDate"
          @change="newMemberErrorText = null"
        />
      </div>
      <p class="error-text">{{ newMemberErrorText }}</p>

      <nav>
        <input
          type="button"
          value="Avbryt"
          class="btn--secondary size--small"
          @click="closeAddNewMember"
        />
        <input
          :disabled="
            newMember.personNum == null ||
            newMember.personNum.length == 0 ||
            newMember.firstName == null ||
            newMember.firstName.length == 0 ||
            newMember.lastName == null ||
            newMember.lastName.length == 0 ||
            newMember.endDate == null ||
            newMember.endDate.length == 0
          "
          type="submit"
          value="Lägg till"
          class="btn--primary size--small"
        />
      </nav>
    </form>
  </dialog>

  <dialog ref="editMemberDialog">
    <form class="new-member-form" @submit.prevent="updateMember()" novalidate>
      <nav>
        <input type="button" value="Avbryt" class="link--primary" @click="closeEditMember" />
      </nav>

      <h2 class="size--normal">Redigera medlem</h2>

      <div
        class="input--primary__wrapper size--small"
        :class="{ error: editedMemberErrorText != null }"
      >
        <label for="edit-personnummer-input">Personnummer:</label>
        <input
          class="input--primary"
          type="text"
          id="edit-personnummer-input"
          name="edit-personnummer-input"
          size="12"
          minlength="12"
          maxlength="12"
          required
          autofocus
          pattern="[0-9]+"
          title="12 siffror, ÅÅÅÅMMDDXXXX"
          placeholder="ÅÅÅÅMMDDXXXX"
          v-model="editedMember.personNum"
          @input="editedMemberErrorText = null"
        />
      </div>

      <div
        class="input--primary__wrapper size--small"
        :class="{ error: editedMemberErrorText != null }"
      >
        <label for="edit-first-name-input">Förnamn:</label>
        <input
          class="input--primary"
          type="text"
          id="edit-first-name-input"
          name="edit-first-name-input"
          minlength="1"
          maxlength="50"
          required
          title="Skriv förnamn..."
          v-model="editedMember.firstName"
          @input="editedMemberErrorText = null"
        />
      </div>

      <div
        class="input--primary__wrapper size--small"
        :class="{ error: editedMemberErrorText != null }"
      >
        <label for="edit-last-name-input">Efternamn:</label>
        <input
          class="input--primary"
          type="text"
          id="edit-last-name-input"
          name="edit-last-name-input"
          minlength="1"
          maxlength="50"
          required
          title="Skriv efternamn..."
          v-model="editedMember.lastName"
          @input="editedMemberErrorText = null"
        />
      </div>

      <div
        class="input--primary__wrapper size--small"
        :class="{ error: editedMemberErrorText != null }"
      >
        <label for="edit-date-input">Medlem t.o.m:</label>
        <input
          class="input--primary"
          type="date"
          name="edit-date-input"
          id="edit-date-input"
          required
          v-model="editedMember.endDate"
          @change="editedMemberErrorText = null"
        />
      </div>
      <p class="error-text">{{ editedMemberErrorText }}</p>

      <nav>
        <input
          type="button"
          value="Radera"
          class="btn--primary size--small btn--danger"
          @click="deleteMember(editedMember.id)"
        />
        <input
          :disabled="
            editedMember.personNum == null ||
            editedMember.personNum.length == 0 ||
            editedMember.firstName == null ||
            editedMember.firstName.length == 0 ||
            editedMember.lastName == null ||
            editedMember.lastName.length == 0 ||
            editedMember.endDate == null ||
            editedMember.endDate.length == 0
          "
          type="submit"
          value="Spara"
          class="btn--primary size--small"
        />
      </nav>
    </form>
  </dialog>
</template>

<style scoped>
main {
  flex-grow: 1;
  justify-content: start;
}

dialog {
  width: auto;
}
dialog form {
  align-items: start;
  text-align: start;
}
dialog nav {
  justify-content: space-between;
}
dialog nav:first-child {
  justify-content: end;
}

#personnummer-input {
  text-align: center;
  width: 8.5em;
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
</style>
