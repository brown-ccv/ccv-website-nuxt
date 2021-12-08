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

export default {
  components: {
    DHero,
  },
  async asyncData({ $content, params }) {
    const data = await $content(params.main, params.category, params.page)
      .sortBy('title', 'asc')
      .fetch();

    return {
      data,
    };
  },
  methods: {
    humanizeHero(str) {
      const cleanStr = str.split('-');
      const upperFirst = cleanStr.map(
        (str) => str.charAt(0).toUpperCase() + str.slice(1)
      );
      return upperFirst.join(' ');
    },
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
