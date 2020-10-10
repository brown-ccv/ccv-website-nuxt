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
                width="medium"
                class="mx-3 my-3 px-3"
              >
                <template #header>
                  <span
                    v-if="item.group"
                    class="radius-0 tag is-link has-text-light"
                    ><fa :icon="['fal', 'users']" class="mr-2" /><abbr
                      :title="item.group | expandAcronym"
                    >
                      {{ item.group }}
                    </abbr></span
                  >

                  <h2>{{ item.title }}</h2>
                  <span class="small has-text-link"
                    >Authors:
                    {{ item.authors.map((a) => a.name).join(', ') }}</span
                  >
                </template>
                <template #content>
                  {{ item.description }}
                </template>
                <template #footer>
                  <div v-if="item.links" class="link-group">
                    <a
                      v-if="item.links.repository"
                      class="link-item d-button has-text-link"
                      :href="item.links.repository"
                      ><span
                        >REPOSITORY<fa
                          class="ml-2"
                          :icon="['fal', 'code-merge']"/></span
                    ></a>
                    <a
                      v-if="item.links.website"
                      class="link-item d-button has-text-link"
                      :href="item.links.website"
                      ><span
                        >WEBSITE<fa
                          class="ml-2"
                          :icon="['fal', 'external-link']"/></span
                    ></a>
                    <a
                      v-if="item.links.documentation"
                      class="link-item d-button has-text-link"
                      :href="item.links.documentation"
                      ><span
                        >DOCUMENTATION<fa
                          class="ml-2"
                          :icon="['fal', 'book']"/></span
                    ></a>
                    <a
                      v-if="item.links.publication"
                      class="link-item d-button has-text-link"
                      :href="item.links.publication"
                      ><span
                        >PUBLICATION<fa
                          class="ml-2"
                          :icon="['fal', 'newspaper']"/></span
                    ></a>
                    <a
                      v-if="item.links.doi"
                      class="link-item d-button has-text-link"
                      :href="'https://' + item.links.doi"
                      ><span
                        >PUBLICATION<fa
                          class="ml-2"
                          :icon="['fal', 'newspaper']"/></span
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
        { category: 'Software Engineering', icon: ['fal', 'code'] },
        { category: 'Conferences', icon: ['fal', 'keynote'] }
      ];
      return iconMap
        .filter((item) => item.category === str)
        .map((item) => item.icon)[0];
    },
    expandAcronym(str) {
      const abbrMap = {
        CBC: 'Computational Biology Core',
        CCV: 'Center for Computation and Visualization',
        DSCOV: 'Data Science, Computing and Visualization Series'
      };
      return abbrMap[str];
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
        { category: 'Software Engineering', icon: ['fal', 'code'] },
        { category: 'Conferences', icon: ['fal', 'keynote'] }
      ];
      return iconMap
        .filter((item) => item.category === str)
        .map((item) => item.icon[1])[0];
    }
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/helpers/spacing';
.link-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.link-item {
  @extend .mx-2;
  @extend .my-2;
  text-decoration: underline;
}
.radius-0 {
  border-radius: 0 !important;
}
</style>
