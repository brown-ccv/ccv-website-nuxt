<template>
  <div>
    <DHero
      variant="light"
      :title="index[0].title"
      :subtitle="index[0].description"
    >
    </DHero>
    <MarkdownToCards :data="data"/>
  </div>
</template>

<script>
import DHero from '@/components/base/DHero.vue';
// other components are lazy loaded per advice in https://vueschool.io/articles/vuejs-tutorials/lazy-loading-individual-vue-components-and-prefetching/

export default {
  components: {
    DHero,
    MarkdownToCards: () => import('@/components/blocks/MarkdownToCards.vue'),
  },
  async asyncData({ $content, params, error }) {

    console.log(params)
    // get the files of top content directories.
    // this provides title and subtitle for banners
    const index = await $content('meta', 'blog')
      .fetch()
      // .catch((e) => error({ statusCode: 404, message: 'Page not found' }));

    // get the content for directories that are only one level deep
    const data = await $content('blog')
      // .sortBy('date', 'asc')
      .fetch()
      // .catch((e) => error({ statusCode: 404, message: 'Page not found' }));

    return { index, data };
  },
};
</script>
