<template>
  <div>
    {{ data }}
    {{ index }}
    <ul>
      <li v-for="(d, i) in toc" :key="'datum' + i">
        <nuxt-link
          :to="{
            name: 'main-category',
            params: {
              ...$route.params,
              category: d
            }
          }"
        >
          {{ d }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  async fetch({ store, params, error }) {
    await store.dispatch('content/fetchData', params);
  },
  computed: mapState({
    data: (state) => state.content.data,
    index: (state) => state.content.index,
    toc: (state) => state.content.toc
  }),
  head() {
    return {
      title: this.index.title, // gets appended to templateTitle from default layout title
      meta: [
        {
          hid: 'description', // important to override template description tag
          name: 'description',
          content: this.index.description
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
