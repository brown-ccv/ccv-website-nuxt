<template>
  <div>
    <DHero
      variant="primary"
      :title="$route.params.category | humanize"
      :subtitle="$route.params.main | humanize"
    >
    </DHero>
    <SingleTemplateA
      v-if="$route.params.main != 'our-work'"
      :data="data"
      :toc="toc"
    />
    <SingleTemplateB v-else :data="data" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DHero } from '@brown-ccv/disco-vue-components';
import SingleTemplateA from '@/components/blocks/SingleTemplateA.vue';
import SingleTemplateB from '@/components/blocks/SingleTemplateB.vue';

export default {
  components: {
    DHero,
    SingleTemplateA,
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
      toc: (state) => state.content.toc
    })
  }
};
</script>

<style lang="scss" scoped></style>
