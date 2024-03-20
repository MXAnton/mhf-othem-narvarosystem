<script>
export default {
  props: {
    idStart: {
      type: String,
      default: 'member'
    },
    header: {
      type: String,
      default: 'Ny medlem'
    },
    submitText: {
      type: String,
      default: 'Lägg till'
    },
    errorText: String,
    member: {
      personNum: null,
      firstName: null,
      lastName: null,
      endDate: null
    }
  },

  data() {
    return {
      modal: null
    }
  },

  methods: {
    openModal() {
      this.modal.showModal()
    },
    closeModal() {
      this.modal.close()
    },

    onClick(_event) {
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
        this.closeModal()
      }
    }
  },

  mounted() {
    this.modal = this.$refs.memberModal

    this.modal.addEventListener('click', this.onClick)
    this.modal.addEventListener('cancel', this.closeModal())
    this.modal.addEventListener('close', this.closeModal())
  },

  beforeUnmount() {
    this.modal.removeEventListener('click', this.onClick)
    this.modal.removeEventListener('cancel', this.closeModal())
    this.modal.removeEventListener('close', this.closeModal())
  }
}
</script>

<template>
  <dialog ref="memberModal">
    <form @submit.prevent="$emit('submitForm')" novalidate>
      <nav>
        <input type="button" value="Stäng" class="link--primary" @click="closeModal" />
      </nav>

      <h2 class="size--normal">{{ header }}</h2>

      <div v-if="idStart === 'edit'" class="input--primary__wrapper personnummer-input size--small">
        <h3 class="label">Personnummer:</h3>
        <p>
          {{ member.personNum }}
        </p>
      </div>
      <div
        v-else
        class="input--primary__wrapper personnummer-input size--small"
        :class="{ error: errorText != null }"
      >
        <label :for="idStart + '-personnummer-input'">Personnummer:</label>
        <input
          class="input--primary"
          type="text"
          :id="idStart + '-personnummer-input'"
          :name="idStart + '-personnummer-input'"
          size="12"
          minlength="12"
          maxlength="12"
          required
          autofocus
          pattern="[0-9]+"
          title="12 siffror, ÅÅÅÅMMDDXXXX"
          placeholder="ÅÅÅÅMMDDXXXX"
          v-model="member.personNum"
          @input="$emit('changedInput')"
        />
      </div>

      <div class="input--primary__wrapper size--small" :class="{ error: errorText != null }">
        <label :for="idStart + '-first-name-input'">Förnamn:</label>
        <input
          class="input--primary"
          type="text"
          :id="idStart + '-first-name-input'"
          :name="idStart + '-first-name-input'"
          minlength="1"
          maxlength="50"
          required
          title="Skriv förnamn..."
          v-model="member.firstName"
          @input="$emit('changedInput')"
        />
      </div>

      <div class="input--primary__wrapper size--small" :class="{ error: errorText != null }">
        <label :for="idStart + '-last-name-input'">Efternamn:</label>
        <input
          class="input--primary"
          type="text"
          :id="idStart + '-last-name-input'"
          :name="idStart + '-last-name-input'"
          minlength="1"
          maxlength="50"
          required
          title="Skriv efternamn..."
          v-model="member.lastName"
          @input="$emit('changedInput')"
        />
      </div>

      <div class="input--primary__wrapper size--small" :class="{ error: errorText != null }">
        <label :for="idStart + '-date-input'">Medlem t.o.m:</label>
        <input
          class="input--primary"
          type="date"
          :name="idStart + '-date-input'"
          :id="idStart + '-date-input'"
          required
          v-model="member.endDate"
          @input="$emit('changedInput')"
        />
      </div>
      <p class="error-text">{{ errorText }}</p>

      <nav>
        <slot></slot>
        <input
          :disabled="
            member.personNum == null ||
            member.personNum.length == 0 ||
            member.firstName == null ||
            member.firstName.length == 0 ||
            member.lastName == null ||
            member.lastName.length == 0 ||
            member.endDate == null ||
            member.endDate.length == 0
          "
          type="submit"
          :value="submitText"
          class="btn--primary size--small"
        />
      </nav>
    </form>
  </dialog>
</template>

<style scoped>
dialog {
  width: calc(min(26rem, 100%));
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
</style>
