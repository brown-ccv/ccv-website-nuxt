<template>
  <div>
    <DHero
      variant="link"
      :title="$route.params.page | humanize"
      :subtitle="$route.params.category | humanize"
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
  filters: {
    humanize(str) {
      const cleanStr = str.split('-');
      const upperFirst = cleanStr.map(
        (str) => str.charAt(0).toUpperCase() + str.slice(1)
      );
      return upperFirst.join(' ');
    },
  },
  async asyncData({ $content, params }) {
    const data = await $content(params.main, params.category, params.page)
      .where({ slug: { $ne: 'index' } })
      .sortBy('title', 'desc')
      .fetch();

    return {
      data,
    };
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
