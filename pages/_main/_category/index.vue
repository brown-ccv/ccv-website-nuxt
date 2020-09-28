<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  async fetch({ store, params, error }) {
    await store.dispatch('content/fetchData', params);
  },
  computed: mapState({
    data: (state) => state.content.data
  })
};
</script>

<style lang="scss" scoped></style>
