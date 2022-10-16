<template>
  <main class="main-content">
    <nuxt-content class="content" :document="post" />
    <AuthorCard :post="post" :people="people" />
    <nuxtLink to="/blog" class="mb-5">
      <DButton name="Back to blog" variant="warning" size="medium" />
    </nuxtLink>
  </main>
</template>

<script>
import DButton from '@/components/base/DButton.vue';
import AuthorCard from '@/components/base/AuthorCard.vue';
export default {
  components: {
    DButton,
    AuthorCard,
  },
  async asyncData({ $content, params }) {
    const post = await $content('blog', params.slug)
      .where({ slug: params.slug })
      .limit(1)
      .fetch();

    const people = await $content('about')
      .where({ slug: 'people' })
      .only(['data'])
      .fetch();

    return {
      post,
      people
    };
  },
};
</script>
