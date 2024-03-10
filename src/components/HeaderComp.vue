<script>
import { RouterLink } from 'vue-router'

export default {
  props: {
    progress: {
      type: Number,
      default: 0
    }
  }
}
</script>

<template>
  <header>
    <RouterLink v-if="progress < 1" to="/narvaro" class="link--primary">Avbryt</RouterLink>

    <div class="progressbar" :style="{ '--progress': progress }">
      <div class="progressbar__progress"></div>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  padding: 3rem 1rem 2rem;

  display: grid;
  grid-template-columns: 1fr calc(min(100%, 610px)) 1fr;
  align-items: center;
  gap: 1rem;
}
@media (width < 50rem) {
  header {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
}

.progressbar {
  grid-column-start: 2;

  width: 100%;
  height: 1rem;

  /* border: 1px solid var(--c-blue); */
  border-radius: 0.5rem;
  position: relative;

  background-color: var(--c-blue);
}
.progressbar__progress {
  position: absolute;
  height: 100%;
  top: 0;
  bottom: 0;
  left: -1px;
  right: calc(100% - 1px - var(--progress) * 100%);
  border-radius: inherit;

  background-color: var(--c-yellow);
}
</style>
