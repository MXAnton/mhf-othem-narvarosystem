<script>
export default {
  props: {
    backToPath: {
      type: String,
      default: '/'
    },
    backToText: {
      type: String,
      default: '< Tillbaka'
    }
  }
}
</script>

<template>
  <header>
    <RouterLink :to="backToPath">{{ backToText }}</RouterLink>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  padding: 1rem;
}
header a {
  font-weight: 500;
  text-decoration: none;
  font-size: 1rem;
  color: var(--color-text);
}
</style>
