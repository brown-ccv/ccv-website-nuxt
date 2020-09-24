<template>
  <div class="">
    <DHero
      variant="warning"
      :title="home.hero.title"
      :subtitle="home.hero.lead"
    >
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
    home: (state) => state.home.home
  }),
  head() {
    return {
      title: this.home.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.home.tagDescription
        }
      ]
    };
  }
};
</script>

<style></style>
