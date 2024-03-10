<script>
import HeaderComp from '@/components/HeaderComp.vue'
import { useAddNarvaroStore } from '@/stores/addNarvaro'

export default {
  components: {
    HeaderComp
  },

  data() {
    return {
      addNarvaroStore: null,

      types: null
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
      this.$router.push({ name: 'narvaroMembership' })
    },
    onSubmit(_event) {
      this.$router.push({ name: 'narvaroLicense' })
    }
  },

  created() {
    this.addNarvaroStore = useAddNarvaroStore()
    this.types = this.getTypes

    if (
      this.addNarvaroStore.type == null ||
      this.types.find((_type) => _type.name === this.addNarvaroStore.type) == null
    ) {
      this.addNarvaroStore.type = this.types[0].name
    }
  }
}
</script>

<template>
  <HeaderComp :progress="0.6" />

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
              :value="_type.name"
              v-model="addNarvaroStore.type"
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
