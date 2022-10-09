<template>
  <main class="main-content">
    <nuxt-content class="content" :document="post" />
    <nuxtLink to="/blog" class="mb-5">
      <DButton name="Back to blog" variant="warning" size="medium" />
    </nuxtLink>
  </main>
</template>

<script>
import DButton from '@/components/base/DButton.vue';
export default {
  components: {
    DButton,
  },
  async asyncData({ $content, params }) {
    const post = await $content('blog', params.slug)
      .where({ slug: params.slug })
      .limit(1)
      .fetch();

    return {
      post,
    };
  },
};
</script>
