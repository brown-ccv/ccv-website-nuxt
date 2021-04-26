<template>
  <!-- General template for main routes i.e. about, services, help...  -->
  <div>
    <DHero
      variant="primary"
      :title="index.title"
      :subtitle="index.description"
      class="hero"
    >
      <!-- Add a button to the Hero when index.yml includes call for action -->
      <template v-if="index['call-for-action']" #button>
        <nuxt-link
          class="d-button is-dark has-text-light"
          :to="index['call-for-action'].href"
        >
          {{ index['call-for-action'].text.toUpperCase() }}
          <span class="icon ml-2">
            <i class="fas fa-caret-right" />
          </span>
        </nuxt-link>
      </template>
    </DHero>
    <!-- The help page is a list of simple cards, informed by .yml files -->
    <FilesToCards v-if="$route.params.main === 'help'" :data="data" />
    <!-- The about page is a made of sections, informed by .md files -->
    <About v-else-if="$route.params.main === 'about'" :data="data" />
    <!-- This is for pages with subdirectories. They are a list of categories -->
    <FilesToCards v-else :data="list" />
  </div>
</template>

<script>
import DHero from '@/components/base/DHero';
import FilesToCards from '@/components/blocks/FilesToCards.vue';
import About from '@/components/blocks/About.vue';

export default {
  components: {
    DHero,
    FilesToCards,
    About
  },
  async asyncData({ $content, params }) {
    // get the index files of top content directories.
    // this provides title and subtitle for banners
    const index = await $content(`${params.main}/index`).fetch();

    // get the content for directories that are only one level deep
    const data = await $content(`${params.main}`, params.slug)
      .where({ slug: { $ne: 'index' } })
      .sortBy('title', 'desc')
      .fetch();

    // for directories that have subdirectories, gather index.yml files
    // which will be feed the content in the cards
    const list = await $content(`${params.main}`, params.slug, {
      deep: true
    })
      .where({ path: { $regex: '^/+[^/]+/+[^/]+/+index' } })
      .sortBy('title', 'desc')
      .fetch();

    return {
      index,
      data,
      list
    };
  }

  //   This is the status banner
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
