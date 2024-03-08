<script>
import { RouterLink } from 'vue-router'
import { useAddNarvaroStore } from '@/stores/addNarvaro'

export default {
  data() {
    return {
      addNarvaroStore: null,

      types: null,
      type: null
    }
  },

  computed: {
    getTypes() {
      const isMember = this.addNarvaroStore.isMember || false
      if (isMember) {
        // Return only types that members can choose
        return this.addNarvaroStore.types.filter((_type) => _type.noMembers === false)
      }
      // Return all types
      return this.addNarvaroStore.types
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onSubmit(_event) {
      this.addNarvaroStore.type = this.type
      // this.$router.push({ name: 'isMember' })
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()
    this.types = this.getTypes
    this.type = Math.min(this.addNarvaroStore.type || 0, this.types.length - 1)
  }
}
</script>

<template>
  <main>
    <h1 class="mb--big">Typ av närvaro</h1>

    <div class="content__wrapper">
      <form @submit.prevent="onSubmit()">
        <div>
          <div v-for="(_type, _i) in types" :key="_i" class="radio--primary__wrapper mb--small">
            <input
              class="radio--primary"
              type="radio"
              :id="_i + '-input'"
              name="type-input"
              required
              :title="_type.name"
              autofocus
              :value="_i"
              v-model="type"
            />
            <label :for="_i + '-input'">{{ _type.name }}</label>
          </div>
        </div>

        <nav>
          <input type="button" value="Tillbaka" class="btn--primary" @click="goBack" />
          <input type="submit" value="Fortsätt" class="btn--primary" />
        </nav>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
