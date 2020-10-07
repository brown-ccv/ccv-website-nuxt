<template>
  <div>
    <ul>
      <li v-for="(d, i) in data" :key="'datum' + i">
        <nuxt-link
          :to="{
            name: 'main-category-page',
            params: {
              ...$route.params,
              page: d.title.toLowerCase().replace(/ /g, '-')
            }
          }"
        >
          {{ d.title }}
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
  computed: {
    ...mapState({
      data: (state) => state.content.data
    })
  }
};
</script>

<style lang="scss" scoped></style>
