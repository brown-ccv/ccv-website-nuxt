<template>
  <div>
    <div class="toc-container">
      <DTOC :data="tocData" name="newtable" variant="white" class="toc" />
    </div>
    <main class="main-content">
      <section
        v-for="(item, i) in categories"
        :id="item | urlize"
        :key="'section' + i"
        class="content-section"
      >
        <template>
          <h2 class="section-title title">
            <!-- <fa
              v-if="item.fa"
              size="2x"
              class="mr-3 has-text-white"
              :icon="[item.fa.prefix, item.fa.icon]"
              :aria-label="'icon of' + item.fa.icon"
            /> -->
            {{ item }}
          </h2>
          <!-- <v-runtime-template
            v-if="item.body"
            :template="item.body"
            class="mb-6"
          /> -->
        </template>
      </section>
    </main>
  </div>
</template>

<script>
import _ from 'lodash';
import { DTOC } from '@brown-ccv/disco-vue-components';

export default {
  components: {
    DTOC
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
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    categories() {
      return _.uniq(this.data.map((item) => item.category));
    },
    tocData() {
      return this.categories.map((d, i) => {
        return {
          name: d,
          link: `#${this.urlize(d)}`,
          icon: { name: 'code', family: 'light' }
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
