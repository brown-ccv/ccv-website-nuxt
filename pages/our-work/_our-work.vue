<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div class="mt-5">
      <!-- <p>{{ index }}</p> -->
      <p>{{ list }}</p>
      <!-- <FilesToCards :data="list" /> -->
    </div>
  </main>
</template>

<script>
export default {

  async asyncData({ $content, params, error }) {
    // get the files of top content directories.
    // this provides title and subtitle for banners
    const index = await $content('meta', 'category', params.main, params.slug)
      .fetch()
      .catch((e) => error({ statusCode: 404, message: 'Page not found' }));

    // for directories that have subdirectories, gather files
    // which will be feed the content in the cards
    const list = await $content('our-work', params.main, params.slug, {
      deep: true,
    })
      .sortBy('title', 'asc')
      .fetch()
      .catch(() => []);

    return {
      index,
      list,
    };
  },
};
</script>
