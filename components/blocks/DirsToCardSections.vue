<template>
  <div>
    <div class="toc-container">
      <DTOC :data="tocData" name="newtable" variant="light" class="toc" />
    </div>
    <main class="main-content">
      <section
        v-for="(category, i) in index"
        :id="category.title | urlize"
        :key="'section' + i"
        class="content-section"
      >
        <template>
          <h2
            class="section-title title has-text-dark"
            :aria-label="'icon of ' + category.mdi.icon"
          >
            <span class="icon is-size-2 mr-3 has-text-white">
              <i :class="[category.mdi.prefix, `mdi-${category.mdi.icon}`]" />
            </span>
            {{ category.title }}
          </h2>
          <CardGroup
            :data="data.filter((a) => a.category === category.title)"
          />
        </template>
      </section>
    </main>
  </div>
</template>

<script>
import DTOC from '@/components/base/DTableOfContents';
import CardGroup from '@/components/blocks/CardGroup';

export default {
  components: {
    DTOC,
    CardGroup
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
      return this.index.map((d, i) => {
        return {
          name: d.title,
          link: `#${this.urlize(d.path)}`,
          icon: { name: d.mdi.icon, family: 'light' }
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

<!-- see assets/scss/_layout.scss for relevant styles -->
