<template>
  <div>
    <DHero
      variant="primary"
      :title="index.title"
      :subtitle="index.description"
      class="hero"
    >
    </DHero>
    <About :toc="toc" />
  </div>
</template>

<script>
import { DHero } from '@brown-ccv/disco-vue-components';
import About from '@/components/blocks/About.vue';

export default {
  components: {
    DHero,
    About
  },
  //   async fetch({ store, params, error }) {
  //     await store.dispatch('content/fetchData', params);
  //   },
  async asyncData({ $content, params }) {
    const index = await $content('about/index').fetch();
    const toc = await $content('about', params.slug)
      .only(['title', 'fa'])
      .where({ title: { $ne: 'About' } })
      .sortBy('title', 'desc')
      .fetch();
    return {
      index,
      toc
    };
  }
  //   head() {
  //     return {
  //       title: this.index.title, // gets appended to templateTitle from default layout title
  //       meta: [
  //         {
  //           hid: 'description', // important to override template description tag
  //           name: 'description',
  //           content: this.index.description
  //         }
  //       ]
  //     };
  //   }
};
</script>

<style lang="scss"></style>
