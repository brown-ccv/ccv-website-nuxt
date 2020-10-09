<template>
  <div>
    <DHero
      variant="primary"
      :title="$route.params.category | humanize"
      :subtitle="$route.params.main | humanize"
    >
    </DHero>
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
import { DHero } from '@brown-ccv/disco-vue-components';

export default {
  components: {
    DHero
  },
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/-/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    }
  },
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
