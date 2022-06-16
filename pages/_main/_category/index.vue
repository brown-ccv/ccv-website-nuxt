<template>
  <!-- General template for sub-routes i.e. our-work/software  -->
  <div>
    <DHero
      variant="light"
      :title="humanizeHero($route.params.category)"
      :subtitle="categoryMeta.description"
    >
      <!-- Add a button to the Hero when index.yml includes call for action -->
      <template v-if="categoryMeta['call-for-action']" #button>
        <nuxt-link
          class="d-button is-warning has-text-dark"
          :to="categoryMeta['call-for-action'].href"
        >
          {{ categoryMeta['call-for-action'].text.toUpperCase() }}
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
import { humanize, urlize, humanizeHero } from '@/utils';

export default {
  components: {
    DHero,
    FilesToSections: () => import('@/components/blocks/FilesToSections.vue'),
    FilesToCards: () => import('@/components/blocks/FilesToCards.vue'),
  },
  async validate({ $content, params, error }) {
    const data = await $content(params.main, params.category)
        .sortBy('title', 'asc')
        .fetch()
        .catch((e) => error({ statusCode: 404, message: 'Page not found' }));
    console.log('vallidddate - category');
    console.log(data);
    return true;
  },
  async asyncData({ $content, params, error }) {
    // get the files of top content directories.
    // this provides title and subtitle for banners
    const index = await $content('meta', 'main', params.main, params.slug)
      .fetch()
      .catch((e) => error({ statusCode: 404, message: 'Page not found' }));

    // get the content for directories that are only one level deep
    const data = await $content(params.main, params.category, { deep: true })
      .where({ slug: { $ne: 'README' } })
      .sortBy('title', 'asc')
      .fetch()
      .catch((e) => error({ statusCode: 404, message: 'Page not found' }));

    // for directories that have subdirectories, gather files
    // which will be feed the content in the cards
    const list = await $content('meta', 'category', params.main, params.slug, {
      deep: true,
    })
      .sortBy('title', 'asc')
      .fetch()
      .catch(() => []);

    return {
      index,
      data,
      list,
    };
  },
  computed: {
    categoryMeta() {
      return this.list.find((x) => x.slug === this.$route.params.category);
    },
  },
  methods: {
    humanize,
    humanizeHero,
    urlize,
  },
};
</script>
