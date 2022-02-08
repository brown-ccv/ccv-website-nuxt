<template>
  <div>
    <div class="toc-container">
      <DTOC :data="tocData" name="about-toc" variant="white" class="toc" />
    </div>
    <main class="main-content">
      <section
        v-for="(item, i) in sortedData"
        :id="urlize(item.title)"
        :key="'about-section' + i"
        class="content-section"
      >
        <h2 class="section-title title has-text-white has-background-success">
          <span
            class="icon mr-3 has-text-white is-size-3"
            :aria-label="'icon of ' + item.icon"
          >
            <i :class="[`mdi mdi-${item.icon}`]" />
          </span>
          {{ item.title }}
        </h2>
        <!-- Opportunities -->
        <client-only>
          <div
            v-if="item.title === 'Opportunities' && opportunities.length > 0"
            class="card-group"
          >
            <template v-for="position in opportunities">
              <a
                :key="position.externalPath"
                class="position-block"
                :href="
                  'https://brown.wd5.myworkdayjobs.com/en-US/staff-careers-brown' +
                  position.externalPath
                "
              >
                <div>
                  <span>
                    <span class="icon mr-3">
                      <i class="mdi mdi-map-marker mdi-24px" />
                    </span>
                    Providence, RI - United States</span
                  >
                  <p class="has-text-dark">
                    {{ position.title }}
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
          </div>
          <div
            v-else-if="
              item.title === 'Opportunities' && opportunities.length === 0
            "
          >
            <p>
              There are no positions open at the moment. Check back with us in
              the future. We appreciate your interest!
            </p>
          </div>
        </client-only>
        <!-- People -->
        <div v-if="item.title === 'People'" class="card-group">
          <DPersonCard
            v-for="person in orderedPeople"
            :key="urlize(person.name)"
            variant="white"
            accent="warning"
            width="xsmall"
            class="mx-1 my-1"
            :name="person.name"
            :title="person.title"
            :team="person.team"
            :main-image="'/content/images/people/' + person.image"
            :hover-image="
              '/content/images/people/' + person.image.replace('main', 'hover')
            "
          >
            <template #icons>
              <a
                v-if="person.github_username"
                :href="'https://github.com/' + person.github_username"
                aria-label="information icon"
                ><span class="icon"><i class="mdi mdi-github" /></span>
              </a>
              <a
                v-if="person.brown_directory_uuid"
                :href="
                  'https://directory.brown.edu/uuid/' +
                  person.brown_directory_uuid
                "
                aria-label="information icon"
                ><span class="icon"><i class="mdi mdi-information" /></span>
              </a>
            </template>
          </DPersonCard>
        </div>
        <!-- General markdown content pages -->
        <nuxt-content
          v-if="item.extension === '.md'"
          :document="item"
          class="content content-section"
        />
      </section>
    </main>
  </div>
</template>

<script>
import DTOC from '@/components/base/DTableOfContents.vue';
import DPersonCard from '@/components/base/DPersonCard.vue';
import { urlize } from '@/utils';

export default {
  components: {
    DTOC,
    DPersonCard,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    opportunities: [],
  }),
  async fetch() {
    const res = await fetch('/_workday/opportunities');
    this.opportunities = await res.json();
  },
  fetchOnServer: false,
  computed: {
    sortedData() {
      const ogData = [...this.data];
      const sortOrder = [
        'oit',
        'mission',
        'teams',
        'people',
        'opportunities',
        'facilities',
        'diversity',
      ];
      return ogData.sort((a, b) => {
        return sortOrder.indexOf(a.slug) - sortOrder.indexOf(b.slug);
      });
    },

    tocData() {
      return this.sortedData.map((d, i) => {
        return {
          name: d.title,
          link: `#${this.urlize(d.title)}`,
          icon: { name: d.icon, family: 'light' },
        };
      });
    },

    orderedPeople() {
      const d = this.data;
      const people = [...d.find((d) => d.title === 'People').data];
      people.sort((a, b) => (a.name > b.name ? 1 : -1));
      return people;
    },
  },
  methods: {
    urlize,
  },
};
</script>

<!-- see assets/scss/_layout.scss for relevant styles -->
