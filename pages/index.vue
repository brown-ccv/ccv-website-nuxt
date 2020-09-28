<template>
  <div class="">
    <DHero variant="warning" :title="index.title" :subtitle="index.description">
      <template #button>
        <DButton name="Learn about CCV's services" variant="link" />
      </template>
    </DHero>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DHero, DButton } from '@brown-ccv/disco-vue-components';

export default {
  components: { DHero, DButton },
  async fetch({ store, error }) {
    await store.dispatch('home/fetchData');
  },
  computed: mapState({
    index: (state) => state.home.index
  }),
  head() {
    return {
      title: this.index.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.index.title
        }
      ]
    };
  }
};
</script>

<style></style>
