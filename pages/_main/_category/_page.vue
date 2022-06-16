<template>
  <div>
    <DHero
      variant="light"
      :title="humanizeHero($route.params.page)"
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
    </main>
  </div>
</template>

<script>
import DHero from '@/components/base/DHero.vue';
import { humanizeHero } from '@/utils';

export default {
  components: {
    DHero,
  },
  async validate({ $content, params, error }) {
    const data = await $content(params.main, params.category, params.page)
        .sortBy('title', 'asc')
        .fetch()
        .catch((e) => error({ statusCode: 404, message: 'Page not found' }));
    console.log('vallidddate - page');
    console.log(data);
    return true;
  },
  async asyncData({ $content, params, error }) {
    const data = await $content(params.main, params.category, params.page)
      .sortBy('title', 'asc')
      .fetch()
      .catch((e) => error({ statusCode: 404, message: 'Page not found' }));

    return {
      data,
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
