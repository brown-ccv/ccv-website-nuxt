<template>
  <div>
    <div class="toc-container">
      <DTOC :data="tocData" name="newtable" variant="light" class="toc" />
    </div>
    <main class="main-content">
      <section
        v-for="(item, i) in data"
        :id="item.title | urlize"
        :key="'about-section' + i"
        class="content-section"
      >
        <h2 class="section-title title">
          <span
            class="icon is-size-3 mr-3 has-text-white"
            :aria-label="'icon of' + item.fa.icon"
          >
            <i :class="[item.fa.prefix, `fa-${item.fa.icon}`]" />
          </span>
          {{ item.title }}
        </h2>
        <!-- General markdown content pages -->
        <nuxt-content v-if="item.extension === '.md'" :document="item" />
      </section>
    </main>
  </div>
</template>

<script>
import DTOC from '@/components/base/DTableOfContents';

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
      default: null
    }
  },
  computed: {
    tocData() {
      return this.data.map((d, i) => {
        return {
          name: d.title,
          link: `#${this.urlize(d.title)}`,
          icon: { name: d.fa.icon, family: 'light' }
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
