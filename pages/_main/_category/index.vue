<template>
  <div>
    <DHero
      variant="primary"
      :title="$route.params.category | humanize"
      :subtitle="$route.params.main | humanize"
    >
    </DHero>
    <SingleTemplate
      v-if="$route.params.main != 'our-work'"
      :index="data"
      :toc="toc"
    />
    <SingleTemplate
      v-else-if="
        $route.params.main === 'our-work' &&
          $route.params.category === 'software'
      "
      :index="list.map((d) => d.index)"
      :data="list.map((d) => d.data[0])"
      :toc="toc"
    />
    <SingleTemplateB v-else :data="data" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DHero } from '@brown-ccv/disco-vue-components';
import SingleTemplate from '@/components/blocks/SingleTemplate.vue';
import SingleTemplateB from '@/components/blocks/SingleTemplateB.vue';

export default {
  components: {
    DHero,
    SingleTemplate,
    SingleTemplateB
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
