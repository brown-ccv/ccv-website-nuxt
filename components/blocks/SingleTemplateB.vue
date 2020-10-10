<template>
  <div>
    <div class="toc-container">
      <DTOC :data="tocData" name="newtable" variant="white" class="toc" />
    </div>
    <main class="main-content">
      <section
        v-for="(category, i) in categories"
        :id="category | urlize"
        :key="'section' + i"
        class="content-section"
      >
        <template>
          <h2 class="section-title title">
            <fa
              size="2x"
              class="mr-3 has-text-white"
              :icon="category | iconize"
            />
            {{ category }}
          </h2>
          <div class="card-group">
            <template v-for="(item, index) in data">
              <DCard
                v-if="item.category === category"
                :key="'item' + index"
                variant="light"
                accent="link"
                width="small"
                class="mx-2 my-2 px-2"
              >
                <template #header>
                  <h2>{{ item.title }}</h2>
                </template>
                <template #content>
                  {{ item.description }}
                </template>
                <template #footer>
                  <div v-if="item.links" class="link-group">
                    <a
                      v-if="item.links.repository"
                      class="d-card is-white has-text-dark mx-2 px-3"
                      ><span
                        >REPOSITORY<fa
                          class="ml-2"
                          :icon="['fal', 'code-merge']"/></span
                    ></a>
                    <a
                      v-if="item.links.website"
                      class="d-card is-white has-text-dark mx-5 px-3"
                      ><span
                        >WEBSITE<fa
                          class="ml-2"
                          :icon="['fal', 'external-link']"/></span
                    ></a>
                  </div>
                </template>
              </DCard>
            </template>
          </div>
        </template>
      </section>
    </main>
  </div>
</template>

<script>
import _ from 'lodash';
import { DTOC, DCard } from '@brown-ccv/disco-vue-components';

export default {
  components: {
    DTOC,
    DCard
  },
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/-/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    },
    urlize(str) {
      return str.toLowerCase().replace(/ /g, '-');
    },
    iconize(str) {
      const iconMap = [
        { category: 'Data Science', icon: ['fal', 'project-diagram'] },
        {
          category: 'Computational Biology',
          icon: ['fal', 'dna']
        },
        { category: 'Data Visualization', icon: ['fal', 'cubes'] },
        { category: 'Cloud Computing', icon: ['fal', 'cloud'] },
        {
          category: 'High-performance computing',
          icon: ['fal', 'server']
        },
        { category: 'DevOps', icon: ['fal', 'cogs'] },
        { category: 'Software Engineering', icon: ['fal', 'code'] }
      ];
      return iconMap
        .filter((item) => item.category === str)
        .map((item) => item.icon)[0];
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
          icon: { name: this.iconize(d), family: 'light' }
        };
      });
    }
  },
  methods: {
    urlize(str) {
      return str.toLowerCase().replace(/ /g, '-');
    },
    iconize(str) {
      const iconMap = [
        { category: 'Data Science', icon: ['fal', 'project-diagram'] },
        {
          category: 'Computational Biology',
          icon: ['fal', 'dna']
        },
        { category: 'Data Visualization', icon: ['fal', 'cubes'] },
        { category: 'Cloud Computing', icon: ['fal', 'cloud'] },
        {
          category: 'High-performance computing',
          icon: ['fal', 'server']
        },
        { category: 'DevOps', icon: ['fal', 'cogs'] },
        { category: 'Software Engineering', icon: ['fal', 'code'] }
      ];
      return iconMap
        .filter((item) => item.category === str)
        .map((item) => item.icon[1])[0];
    }
  }
};
</script>

<style lang="scss">
.link-group {
  display: flex;
  justify-content: center;
}
</style>
