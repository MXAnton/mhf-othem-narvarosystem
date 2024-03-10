<script>
import { RouterLink } from 'vue-router'

export default {
  props: {
    goToUrl: {
      type: String,
      default: '/'
    },
    waitSeconds: {
      type: Number,
      default: 60
    }
  },

  data() {
    return {
      inactivityTimer: this.waitSeconds,
      propmtTimer: this.waitSeconds,
      timerId: null,

      modal: null
    }
  },

  methods: {
    onStay() {
      clearInterval(this.timerId)
      this.modal.close()
      this.restartTimer()
    },

    restartTimer() {
      this.modal.close()
      clearInterval(this.timerId)

      this.inactivityTimer = this.waitSeconds

      this.timerId = setInterval(() => {
        this.inactivityTimer--

        if (this.inactivityTimer <= 0) {
          // Clear the interval if time has reached 0
          clearInterval(this.timerId)
          this.modal.showModal()

          this.propmtTimer = this.waitSeconds
          this.timerId = setInterval(() => {
            // Decrease the time by 1 second
            this.propmtTimer--

            // Check if time has reached 0
            if (this.propmtTimer <= 0) {
              // Clear the interval if time has reached 0
              clearInterval(this.timerId)
              this.$router.push(this.goToUrl)
            }
          }, 1000)
        }
      }, 1000) // Execute the function every 1000 milliseconds (1 second)
    }
  },

  mounted() {
    this.modal = this.$refs.timeoutModal

    this.restartTimer()

    document.addEventListener('mousemove', (event) => {
      if (this.inactivityTimer < this.waitSeconds - 1 && !this.modal.open) {
        this.restartTimer()
      }
    })

    this.modal.addEventListener('click', (_event) => {
      if (_event.target.tagName !== 'DIALOG')
        //This prevents issues with forms
        return

      const rect = _event.target.getBoundingClientRect()

      const clickedInDialog =
        rect.top <= _event.clientY &&
        _event.clientY <= rect.top + rect.height &&
        rect.left <= _event.clientX &&
        _event.clientX <= rect.left + rect.width

      if (clickedInDialog === false) this.onStay()
    })
    this.modal.addEventListener('cancel', (event) => {
      this.onStay()
    })
    this.modal.addEventListener('close', (event) => {
      this.onStay()
    })
  },

  beforeUnmount() {
    clearInterval(this.timerId)
    document.removeEventListener('mousemove', (event) => {
      if (this.inactivityTimer < this.waitSeconds - 1 && !this.modal.open) {
        this.restartTimer()
      }
    })
  }
}
</script>

<template>
  <dialog ref="timeoutModal">
    <h2>Varning!</h2>
    <p class="mb--small">P.g.a inaktivitet avbryts närvaroanmälan om {{ propmtTimer }} sekunder!</p>
    <button class="btn--primary" @click="onStay()">Stanna</button>
  </dialog>
</template>

<style scoped>
/*   Closed state of the dialog   */
dialog {
  width: calc(min(40rem, 100%));

  position: fixed;
  left: 50%;
  top: 50%;

  padding: 2rem 2rem 3.5rem;

  background-color: var(--color-bg);
  border: 3px solid var(--c-red);
  border-radius: 0.2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-align: center;

  opacity: 0;
  transform-origin: top left;
  transform: scale(0) translateX(-50%) translateY(-50%);
  transition:
    opacity 0.1s ease-out,
    transform 0.1s ease-out;
}
/* Transition the :backdrop when the dialog modal is promoted to the top layer */
dialog::backdrop {
  background-color: rgb(0 0 0 / 0%);
  transition: background-color 0.7s;
}

/*   Open state of the dialog  */
dialog[open] {
  opacity: 1;
  transform: scale(1) translateX(-50%) translateY(-50%);
}
dialog[open]::backdrop {
  background-color: rgb(0 0 0 / 50%);
}
</style>
