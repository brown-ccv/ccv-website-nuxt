<template>
  <div>
    <DHero variant="primary" :title="index.title" :subtitle="index.description">
      <template v-if="index['call-for-action']" #button>
        <nuxt-link
          class="d-button is-dark has-text-light"
          :to="index['call-for-action'].href"
        >
          {{ index['call-for-action'].text }}
        </nuxt-link>
      </template>
    </DHero>
    <Help v-if="$route.params.main === 'help'" :data="data" />
    <About v-else-if="$route.params.main === 'about'" :data="data" :toc="toc" />

    <div v-else>
      <ul>
        <li v-for="(d, i) in toc" :key="'datum' + i">
          <nuxt-link
            :to="{
              name: 'main-category',
              params: {
                ...$route.params,
                category: d
              }
            }"
          >
            {{ d }}
          </nuxt-link>
        </li>
      </ul>
      {{ data }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DHero } from '@brown-ccv/disco-vue-components';
import Help from '@/components/blocks/Help.vue';
import About from '@/components/blocks/About.vue';

export default {
  components: {
    DHero,
    Help,
    About
  },
  async fetch({ store, params, error }) {
    await store.dispatch('content/fetchData', params);
  },
  computed: mapState({
    data: (state) => state.content.data,
    index: (state) => state.content.index,
    toc: (state) => state.content.toc
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

<style lang="scss" scoped></style>
