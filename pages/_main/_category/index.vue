<template>
  <!-- General template for sub-routes i.e. our-work/software  -->
  <div>
    <DHero
      variant="light"
      :title="$route.params.category | humanize"
      :subtitle="list.find(x => x.slug === $route.params.category).description"
    >
      <!-- Add a button to the Hero when index.yml includes call for action -->
      <template v-if="list.find(x => x.slug === $route.params.category)['call-for-action']" #button>
        <nuxt-link
          class="d-button is-warning has-text-dark"
          :to="list.find(x => x.slug === $route.params.category)['call-for-action'].href"
        >
          {{ list.find(x => x.slug === $route.params.category)['call-for-action'].text.toUpperCase() }}
          <span class="icon ml-2">
            <i class="mdi mdi-menu-right" />
          </span>
        </nuxt-link>
      </template>
    </DHero>
    <FilesToCards v-if="$route.params.main === 'our-work'" :data="data" />
    <!-- This is for directories containing markdown files -->
    <FilesToSections v-else :data="data" />
  </div>
</template>

<script>
import DHero from '@/components/base/DHero.vue';

export default {
  components: {
    DHero,
    FilesToSections: () => import('@/components/blocks/FilesToSections.vue'),
    FilesToCards: () => import('@/components/blocks/FilesToCards.vue'),
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
    // get the files of top content directories.
    // this provides title and subtitle for banners
    const index = await $content(
      'meta',
      'main',
      params.main,
      params.slug
    ).fetch();

    // get the content for directories that are only one level deep
    const data = await $content(params.main, params.category, { deep: true })
      .where({ slug: { $ne: 'README' } })
      .sortBy('title', 'asc')
      .fetch();

    // for directories that have subdirectories, gather files
    // which will be feed the content in the cards
    const list = await $content(
      'meta',
      'category',
      params.main,
      params.slug,
      {
        deep: true,
      }
    )
      .sortBy('title', 'asc')
      .fetch();

    return {
      index,
      data,
      list,
    };
  },
};
</script>
