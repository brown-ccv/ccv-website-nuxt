<template>
  <div>{{ index }}</div>
</template>

<script>
import { mapState } from 'vuex'; // <--- To map event
export default {
  async fetch({ store, error }) {
    await store.dispatch('about/fetchData');
  },
  computed: mapState({
    index: (state) => state.about.index
  }),
  head() {
    return {
      title: this.index.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.index.description
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
