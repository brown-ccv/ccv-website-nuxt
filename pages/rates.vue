<template>
  <div>
    <DHero
      variant="primary"
      :title="index.title"
      :subtitle="index.lead"
    ></DHero>
    <main class="content-wrapper mt-6">
      <!-- General markdown content pages -->
      <nuxt-content
        v-if="index.extension === '.md'"
        :document="index"
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
  async asyncData({ $content}) {

    const index = await $content(
      'rates'
    ).fetch();

    return { index};
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
