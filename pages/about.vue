<template>
  <div>{{ about }}</div>
</template>

<script>
import { mapState } from 'vuex'; // <--- To map event
export default {
  async fetch({ store, error }) {
    await store.dispatch('about/fetchData');
  },
  computed: mapState({
    about: (state) => state.about.about
  }),
  head() {
    return {
      title: this.about.tagTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.about.tagDescription
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
