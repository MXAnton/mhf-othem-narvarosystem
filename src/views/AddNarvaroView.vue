<script>
import { RouterLink } from 'vue-router'

export default {
  data() {
    return {
      personNum: null
    }
  }
}
</script>

<template>
  <main>
    <h1 class="sub-header">Välkommen!</h1>
    <h2 class="mb--big">Anmäl dig nedan</h2>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit()">
        <div class="input--primary__wrapper">
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
            pattern="[0-9]+"
            title="12 siffror, ÅÅÅÅMMDDXXXX"
            placeholder="ÅÅÅÅMMDDXXXX"
            autofocus
            v-model="personNum"
          />
        </div>

        <p>
          Genom att fortsätta godkänner du att vi hanterar dina personuppgifter enligt GDPR, läs mer
          <RouterLink to="/gdpr" class="link--primary">här</RouterLink>.
        </p>

        <input type="submit" value="Anmäl" class="btn--primary" />
      </form>
    </div>

    <img class="mt--bigger" src="@/assets/images/MHF-Ungdom-logo.png" alt="MHF Ungdom logga." />
  </main>
</template>

<style scoped>
h2 {
  font-size: 5rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form > p {
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-wrap: balance;
  text-align: center;
}

#personnummer-input {
  font-size: 4rem;
}
</style>
