<template>
  <!-- General template for main routes i.e. about, services, help...  -->
  <div>
    <DHero
      variant="light"
      :title="index.title"
      :subtitle="index.description"
      class="hero"
    >
      <!-- Add a button to the Hero when index.yml includes call for action -->
      <template v-if="index['call-for-action']" #button>
        <nuxt-link
          class="d-button is-warning has-text-dark"
          :to="index['call-for-action'].href"
        >
          {{ index['call-for-action'].text.toUpperCase() }}
          <span class="icon ml-2">
            <i class="mdi mdi-menu-right" />
          </span>
        </nuxt-link>
      </template>
    </DHero>
    <!-- The help page is a list of simple cards, informed by .yml files -->
    <FilesToCards v-if="$route.params.main === 'help'" :data="data" />
    <!-- The about page is a made of sections, informed by .md files -->
    <About v-else-if="$route.params.main === 'about'" :data="data" />
    <!-- This is for pages with subdirectories. They are a list of categories -->
    <FilesToCards v-else :data="list" />
  </div>
</template>

<script>
import DHero from '@/components/base/DHero.vue';
// other components are lazy loaded per advice in https://vueschool.io/articles/vuejs-tutorials/lazy-loading-individual-vue-components-and-prefetching/

export default {
  components: {
    DHero,
    FilesToCards: () => import('@/components/blocks/FilesToCards.vue'),
    About: () => import('@/components/blocks/About.vue'),
  },
  async asyncData({ $content, params }) {
    // get the files of top content directories.
    // this provides title and subtitle for banners
    const index = await $content(
      'meta',
      'main',
      `${params.main}`,
      params.slug
    ).fetch();

    // get the content for directories that are only one level deep
    const data = await $content(`${params.main}`, params.slug, { deep: true })
      .where({ slug: { $ne: 'README' } })
      .sortBy('title', 'desc')
      .fetch();

    // for directories that have subdirectories, gather files
    // which will be feed the content in the cards
    const list = await $content(
      'meta',
      'category',
      `${params.main}`,
      params.slug,
      {
        deep: true,
      }
    )
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
