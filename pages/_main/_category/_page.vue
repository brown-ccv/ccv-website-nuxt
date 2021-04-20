<template>
  <div>
    <DHero
      variant="primary"
      :title="$route.params.page | humanize"
      :subtitle="$route.params.category | humanize"
    >
    </DHero>
    <main class="content-wrapper">
      <!-- General markdown content pages -->
      <nuxt-content
        v-if="item.extension === '.md'"
        :document="data"
        class="content content-section"
      />
    </main>
  </div>
</template>

<script>
import DHero from '@/components/disco-vue-components/d-hero';

export default {
  components: {
    DHero
  },
  filters: {
    humanize(str) {
      const cleanStr = str.split('-');
      const upperFirst = cleanStr.map(
        (str) => str.charAt(0).toUpperCase() + str.slice(1)
      );
      return upperFirst.join(' ');
    }
  },
  async asyncData({ $content, params }) {
    const data = await $content(
      `${params.main}/${params.category}/${params.page}`,
      params.slug
    )
      .where({ slug: { $ne: 'index' } })
      .sortBy('title', 'desc')
      .fetch();

    return {
      data
    };
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/helpers/spacing';
@import '~bulma/sass/helpers/visibility';
@import '~bulma/sass/helpers/typography';
.content-wrapper {
  @extend .mt-6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
