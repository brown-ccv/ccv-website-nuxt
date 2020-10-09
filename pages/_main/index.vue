<template>
  <div>
    <DHero
      variant="primary"
      :title="index.title"
      :subtitle="index.description"
      class="hero"
    >
      <template v-if="index['call-for-action']" #button>
        <nuxt-link
          class="d-button is-dark has-text-light"
          :to="index['call-for-action'].href"
        >
          {{ index['call-for-action'].text.toUpperCase() }}
          <fa :icon="['fas', 'caret-right']" class="ml-2" />
        </nuxt-link>
      </template>
    </DHero>
    <ListTemplate v-if="$route.params.main === 'help'" :data="data" />
    <About v-else-if="$route.params.main === 'about'" :data="data" :toc="toc" />
    <ListTemplate v-else :data="list.map((d) => d.index)" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DHero } from '@brown-ccv/disco-vue-components';
import ListTemplate from '@/components/blocks/ListTemplate.vue';
import About from '@/components/blocks/About.vue';

export default {
  components: {
    DHero,
    ListTemplate,
    About
  },
  async fetch({ store, params, error }) {
    await store.dispatch('content/fetchData', params);
  },
  computed: mapState({
    data: (state) => state.content.data,
    index: (state) => state.content.index,
    toc: (state) => state.content.toc,
    list: (state) => state.content.list
  }),
  head() {
    return {
      title: this.index.title, // gets appended to templateTitle from default layout title
      meta: [
        {
          hid: 'description', // important to override template description tag
          name: 'description',
          content: this.index.description
        }
      ]
    };
  }
};
</script>

<style lang="scss"></style>
