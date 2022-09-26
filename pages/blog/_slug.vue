<template>
  <main class="main-content">
    <nuxt-content class="content" :document="post" />
    <nuxt-link to="/blog" class="hover:underline">Back to blog</nuxt-link>
  </main>
</template>

<script>
export default {
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
