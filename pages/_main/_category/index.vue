<template>
  <div>
    <DHero
      variant="primary"
      :title="$route.params.category | humanize"
      :subtitle="$route.params.main | humanize"
    >
    </DHero>

    <SingleTemplate
      v-if="$route.params.main === 'our-work'"
      :index="list.map((d) => d.index)"
      :data="list.map((d) => d.data)"
      :toc="toc"
    />
    <SingleTemplate v-else :index="data" :toc="toc" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DHero } from '@brown-ccv/disco-vue-components';
import SingleTemplate from '@/components/blocks/SingleTemplate.vue';

export default {
  components: {
    DHero,
    SingleTemplate
  },
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/-/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    },
    urlize(str) {
      return str.toLowerCase().replace(/ /g, '-');
    }
  },
  async fetch({ store, params, error }) {
    await store.dispatch('content/fetchData', params);
  },
  computed: {
    ...mapState({
      data: (state) => state.content.data,
      toc: (state) => state.content.toc,
      list: (state) => state.content.list
    })
  }
};
</script>

<style lang="scss" scoped></style>
