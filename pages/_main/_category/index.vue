<template>
  <!-- General template for sub-routes i.e. our-work/software  -->
  <div>
    <DHero
      variant="primary"
      :title="$route.params.category | humanize"
      :subtitle="index.description"
    >
    </DHero>
    <!-- This is for directories containing subdirectories -->
    <DirsToCardSections
      v-if="$route.params.main === 'our-work'"
      :index="list"
      :data="data"
    />
    <!-- This is for directories containing markdown files -->
    <FilesToSections v-else :data="data" />
  </div>
</template>

<script>
import DHero from '@/components/base/DHero.vue';

export default {
  components: {
    DHero,
    DirsToCardSections: () =>
      import('@/components/blocks/DirsToCardSections.vue'),
    FilesToSections: () => import('@/components/blocks/FilesToSections.vue'),
  },
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/-/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    },
    urlize(str) {
      return str.toLowerCase().replace(/ /g, '-');
    },
  },
  async asyncData({ $content, params }) {
    // get the index files of content subdirectories directories
    // such as /our-work/software.
    // this provides title and subtitle for banners
    const index = await $content(params.main, params.category, 'index').fetch();

    // get the content for all sub-directories {deep:true}
    const data = await $content(params.main, params.category, {
      deep: true,
    })
      .where({ slug: { $ne: 'index' } })
      .sortBy('title', 'desc')
      .fetch();

    // for directories that have subdirectories, gather index.yml files
    // which will be feed the content in the cards
    const list = await $content(params.main, params.category, {
      deep: true,
    })
      .where({ path: { $regex: '^/+[^/]+/+[^/]+/+[^/]+/+index' } })
      .sortBy('title', 'desc')
      .fetch();

    return {
      index,
      data,
      list,
    };
  },
};
</script>
