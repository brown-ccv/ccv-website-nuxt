<template>
  <div>
    <div class="toc-container">
      <DTOC :data="tocData" name="newtable" variant="white" class="toc" />
    </div>
    <main class="main-content">
      <section
        v-for="(category, i) in index"
        :id="category.title | urlize"
        :key="'section' + i"
        class="content-section"
      >
        <template>
          <h2 class="section-title title has-text-dark">
            <fa
              v-if="category.fa"
              size="2x"
              class="mr-3 has-text-white"
              :icon="[category.fa.prefix, category.fa.icon]"
              :aria-label="'icon of' + category.fa.icon"
            />{{ category.title }}
          </h2>

          <v-runtime-template
            v-if="category.body"
            :template="category.body"
            class="mb-6 has-text-dark"
          />
          <WorkCardGroup v-if="data" :data="data" :category="category.title" />
        </template>
      </section>
    </main>
  </div>
</template>

<script>
import { DTOC } from '@brown-ccv/disco-vue-components';
import VRuntimeTemplate from 'v-runtime-template';
import WorkCardGroup from '@/components/blocks/WorkCardGroup.vue';

export default {
  components: {
    DTOC,
    VRuntimeTemplate,
    WorkCardGroup
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
    toc: {
      type: Array,
      required: true
    },
    index: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  computed: {
    tocData() {
      const icons = this.index.map((item) => {
        const icon = item.fa.icon;
        return icon;
      });
      return this.toc.map((d, i) => {
        return {
          name: this.humanize(d),
          link: `#${this.urlize(d)}`,
          icon: { name: icons[i], family: 'light' }
        };
      });
    }
  },
  methods: {
    urlize(str) {
      return str.toLowerCase().replace(/ /g, '-');
    },
    humanize(str) {
      const cleanStr = str.replace(/-/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    }
  }
};
</script>

<style lang="scss" scoped></style>
