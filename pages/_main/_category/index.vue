<template>
  <div>
    <DHero
      variant="primary"
      :title="$route.params.category | humanize"
      :subtitle="$route.params.main | humanize"
    >
    </DHero>
    <div class="toc-container">
      <DTOC :data="tocData" name="newtable" variant="white" class="toc" />
    </div>
    <main class="main-content">
      <section
        v-for="(item, i) in data"
        :id="item.title | urlize"
        :key="'people-section' + i"
        class="content-section"
      >
        <template>
          <h2 class="section-title title">
            <fa
              v-if="item.fa"
              size="2x"
              class="mr-3 has-text-white"
              :icon="[item.fa.prefix, item.fa.icon]"
              :aria-label="'icon of' + item.fa.icon"
            />{{ item.title }}
          </h2>
          <v-runtime-template
            v-if="item.body"
            :template="item.body"
            class="mb-6"
          />
        </template>
      </section>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DHero, DTOC } from '@brown-ccv/disco-vue-components';
import VRuntimeTemplate from 'v-runtime-template';

export default {
  components: {
    DHero,
    DTOC,
    VRuntimeTemplate
  },
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/-/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    },
    urlize(str) {
      return str.toLowerCase().replace(/ /g, '-');
    }
  },
  async fetch({ store, params, error }) {
    await store.dispatch('content/fetchData', params);
  },
  computed: {
    ...mapState({
      data: (state) => state.content.data,
      toc: (state) => state.content.toc
    }),
    tocData() {
      const icons = this.data.map((item) => item.fa.icon);
      return this.toc.map((d, i) => {
        return {
          name: d,
          link: `#${this.urlize(d)}`,
          icon: { name: icons[i], family: 'light' }
        };
      });
    }
  },
  methods: {
    urlize(str) {
      return str.toLowerCase().replace(/ /g, '-');
    }
  }
};
</script>

<style lang="scss" scoped></style>
