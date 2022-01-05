<template>
  <div>
    <div class="toc-container">
      <DTOC :data="tocData" name="newtable" variant="light" class="toc" />
    </div>
    <main class="main-content">
      <section
        v-for="(item, i) in data"
        :id="urlize(item.title)"
        :key="'about-section' + i"
        class="content-section"
      >
        <h2 class="section-title title has-text-white has-background-success">
          <span
            class="icon is-size-3 mr-3 has-text-white"
            :aria-label="'icon of ' + item.icon"
          >
            <i :class="[`mdi mdi-${item.icon}`]" />
          </span>
          {{ item.title }}
        </h2>
        <!-- General markdown content pages -->
        <nuxt-content
          v-if="item.extension === '.md'"
          class="content"
          :document="item"
        />
      </section>
    </main>
  </div>
</template>

<script>
import DTOC from '@/components/base/DTableOfContents.vue';

export default {
  components: {
    DTOC,
  },
  props: {
    data: {
      type: Array,
      default: null,
    },
  },
  computed: {
    tocData() {
      return this.data.map((d, i) => {
        return {
          name: d.title,
          link: `#${this.urlize(d.title)}`,
          icon: { name: d.icon, family: 'light' },
        };
      });
    },
  },
  methods: {
    urlize(str) {
      return str.toLowerCase().replace(/ /g, '-');
    }
  },
};
</script>

<!-- see assets/scss/_layout.scss for relevant styles -->
