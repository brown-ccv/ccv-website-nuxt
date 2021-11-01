<template>
  <div>
     <div class="toc-container">
      <DTOC :data="tocData" name="about-toc" variant="white" class="toc" />
    </div>
    <main class="main-content">
      <section
        v-for="(item, i) in data"
        :id="item.title | urlize"
        :key="'about-section' + i"
        class="content-section"
      >
        <h2 class="section-title title has-text-white has-background-success">
          <span
            class="icon mr-3 has-text-white is-size-2"
            :aria-label="'icon of ' + item.icon"
          >
            <i :class="[`mdi mdi-${item.icon}`]" />
          </span>
          {{ item.title }}
        </h2>
        <!-- Opportunities -->
        <div v-if="item.title === 'Opportunities'" class="card-group">
          <template v-if="item.data.length > 0">
            <a
              v-for="(position, ind) in item.data"
              :key="'position' + ind"
              class="position-block"
              :href="position.link"
            >
              <div>
                <span>
                  <span class="icon mr-3">
                    <i class="mdi mdi-map-marker mdi-24px" />
                  </span>
                  Providence, RI - United States</span
                >
                <p class="has-text-dark">
                  {{ position.title }} – {{ position.subteam }}
                </p>
              </div>
              <div>
                <p>
                  Learn More<span class="icon ml-3">
                    <i class="mdi mdi-arrow-right" />
                  </span>
                </p>
              </div>
            </a>
          </template>
          <div v-else>
            <p>
              There are no positions open at the moment Check back with us in
              the future. We appreciate your interest!
            </p>
          </div>
        </div>
        <!-- People -->
        <div v-if="item.title === 'People'" class="card-group">
          <DPersonCard
            v-for="person in item.data"
            :key="person.name | urlize"
            variant="white"
            accent="warning"
            width="small"
            class="mx-1 my-1 test"
            :name="person.name"
            :title="person.title"
            :team="person.team"
            :main-image="
              'https://ccv.brown.edu/images/people/JPEG/' + person.image
            "
            :hover-image="
              'https://ccv.brown.edu/images/people/JPEG/' +
              person.image.replace('main', 'hover')
            "
          >
            <template #icons>
              <a
                :href="'https://github.com/' + person.github_username"
                aria-label="information icon"
                ><span class="icon"><i class="mdi mdi-github" /></span>
              </a>
            </template>
          </DPersonCard>
        </div>
        <!-- General markdown content pages -->
        <nuxt-content v-if="item.extension === '.md'" :document="item" />
      </section>
    </main>
  </div>
</template>

<script>
import DTOC from '@/components/base/DTableOfContents.vue';
import DPersonCard from '@/components/base/DPersonCard.vue';

export default {
  components: {
    DTOC,
    DPersonCard,
  },
  filters: {
    urlize(str) {
      return str.toLowerCase().replace(/ /g, '-');
    },
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    tocData() {
      const ogData = this.data;
      const SortOrder = ['mission','people','opportunities','facilities','diversity'];
      const SortedData = ogData.sort(function(a, b){return SortOrder.indexOf(a.slug) - SortOrder.indexOf(b.slug)});
      return SortedData.map((d, i) => {
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
    },
  },
};
</script>

<!-- see assets/scss/_layout.scss for relevant styles -->
<style lang="scss" scoped>
.test{
  width: 20%;
}
</style>