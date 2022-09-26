<template>
  <div>
    <DHero
      variant="light"
      :title="index[0].title"
      :subtitle="index[0].description"
    >
    </DHero>
    <div>{{data}}</div>
    <!-- <MarkdownToCards :data="data"/> -->
  </div>
</template>

<script>
import DHero from '@/components/base/DHero.vue';
// other components are lazy loaded per advice in https://vueschool.io/articles/vuejs-tutorials/lazy-loading-individual-vue-components-and-prefetching/

export default {
  components: {
    DHero,
    // MarkdownToCards: () => import('@/components/blocks/MarkdownToCards.vue'),
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  async asyncData({ $content, params, error }) {
    // get the files of top content directories.
    // this provides title and subtitle for banners
    const index = await $content('meta', 'blog', params.main, params.slug)
      .fetch()
      // .catch((e) => error({ statusCode: 404, message: 'Page not found' }));

    // get the content for directories that are only one level deep
    const data = await $content(params.main, params.slug, { deep: true })
      .where({ slug: { $ne: 'README' } })
      .sortBy('title', 'asc')
      .fetch()
      // .catch((e) => error({ statusCode: 404, message: 'Page not found' }));

    return { index, data };
  },
};
</script>
