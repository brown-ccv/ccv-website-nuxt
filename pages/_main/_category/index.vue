<template>
  <!-- General template for sub-routes i.e. our-work/software  -->
  <div>
    <DHero
      variant="primary"
      :title="$route.params.category | humanize"
      :subtitle="index2.description"
    >
    </DHero>

    <SingleTemplate
      v-if="$route.params.main === 'our-work'"
      :index="list2"
      :data="data2"
    />
    <!-- <SingleTemplate v-else :index="data" :toc="toc" /> -->
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
  async asyncData({ $content, params }) {
    // get the index files of content subdirectories directories
    // such as /our-work/software.
    // this provides title and subtitle for banners
    const index2 = await $content(
      `${params.main}/${params.category}/index`
    ).fetch();

    // get the content for directories that are only one level deep
    const data2 = await $content(
      `${params.main}/${params.category}`,
      params.slug,
      {
        deep: true
      }
    )
      .where({ slug: { $ne: 'index' } })
      .sortBy('title', 'desc')
      .fetch();

    // for directories that have subdirectories, gather index.yml files
    // which will be feed the content in the cards
    const list2 = await $content(
      `${params.main}/${params.category}`,
      params.slug,
      {
        deep: true
      }
    )
      .where({ path: { $regex: '^/+[^/]+/+[^/]+/+[^/]+/+index' } })
      .sortBy('title', 'desc')
      .fetch();

    return {
      index2,
      data2,
      list2
    };
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
