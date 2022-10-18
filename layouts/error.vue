<template>
  <div
    class="container my-6 px-2 is-flex is-flex-direction-column is-align-items-center has-text-centered"
  >
    <div v-if="error.statusCode === 404">
      <h1 class="is-size-1 has-text-weight-bold">404</h1>
      <p class="is-size-3">Woof... Sorry, this page does not exist!</p>
    </div>
    <h1 v-else class="is-size-3 has-text-weight-bold">
      An error occurred - {{ error.statusCode }}
    </h1>
    <img class="header-image" src="@/assets/riggins404nobg.png" alt="" />
    <nuxtLink to="/">
      <DButton name="Home" variant="warning" size="medium" />
    </nuxtLink>
  </div>
</template>

<script>
import DButton from '@/components/base/DButton.vue';

export default {
  components: {
    DButton,
  },
  layout: 'error',
  props: {
    error: {
      default() {
        return {};
      },
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.header-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3.5em;
  margin-top: 2em;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5))
    drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))
    drop-shadow(0 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(0 8px 8px rgba(0, 0, 0, 0.5))
    drop-shadow(0 16px 16px rgba(0, 0, 0, 0.5))
    drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5));
}
</style>
