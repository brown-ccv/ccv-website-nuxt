<template>
  <div>
    <DHero
      variant="light"
      :title="humanizeHero(data.title)"
      :subtitle="humanizeHero($route.params.category)"
    >
    </DHero>
    <main class="content-wrapper mt-6">
      <!-- General markdown content pages -->
      <nuxt-content
        v-if="data.extension === '.md'"
        :document="data"
        class="content content-section"
      />
      <OurWorkDetail
        v-else-if="data.extension === '.yml'"
        :data="data"
        :people="people"
      ></OurWorkDetail>
    </main>
  </div>
</template>

<script>
import DHero from '@/components/base/DHero.vue';
import OurWorkDetail from '@/components/blocks/OurWorkDetail.vue';
import { humanizeHero } from '@/utils';

export default {
  components: {
    DHero,
    OurWorkDetail,
  },
  async asyncData({ $content, params, error }) {
    const data = await $content(params.main, params.category, params.page)
      .sortBy('title', 'asc')
      .fetch()
      .catch((e) => error({ statusCode: 404, message: 'Page not found' }));

    const ourwork = await $content('our-work', params.main, params.slug, {
      deep: true,
    })
      .fetch()
      .catch(() => []);

    // get the content for directories that are only one level deep
    const people = await $content('about')
      .where({ slug: { $in: 'people' } })
      .fetch()
      .catch((e) => error({ statusCode: 404, message: 'Page not found' }));

    return {
      data,
      ourwork,
      people,
    };
  },
  methods: {
    humanizeHero,
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
