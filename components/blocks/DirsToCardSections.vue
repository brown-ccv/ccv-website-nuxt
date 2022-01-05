<template>
  <div>
    <div class="toc-container">
      <DTOC :data="tocData" name="newtable" variant="light" class="toc" />
    </div>
    <main class="main-content">
      <section
        v-for="(category, i) in index"
        :id="urlize(category.title)"
        :key="'section' + i"
        class="content-section"
      >
        <h2
          class="section-title title has-text-white"
          :aria-label="'icon of ' + category.icon"
        >
          <span class="icon is-size-2 mr-3 has-text-white">
            <i :class="[`mdi mdi-${category.icon}`]" />
          </span>
          {{ category.title }}
        </h2>
        <CardGroup :data="data.filter((a) => a.category === category.title)" />
      </section>
    </main>
  </div>
</template>

<script>
import DTOC from '@/components/base/DTableOfContents.vue';
import CardGroup from '@/components/blocks/CardGroup.vue';
import { urlize } from '@/utils';

export default {
  components: {
    DTOC,
    CardGroup,
  },
  props: {
    index: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      default: null,
    },
  },
  computed: {
    tocData() {
      return this.index.map((d, i) => {
        return {
          name: d.title,
          link: `#${this.urlize(d.title)}`,
          icon: { name: d.icon, family: 'light' },
        };
      });
    },
  },
  methods: {
    urlize
  },
};
</script>

<!-- see assets/scss/_layout.scss for relevant styles -->
