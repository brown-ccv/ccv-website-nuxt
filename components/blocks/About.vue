<template>
  <div>
    <div class="toc-container">
      <DTOC :data="tocData" name="about-toc" variant="white" class="toc" />
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
            v-for="person in orderedPeople"
            :key="urlize(person.name)"
            variant="white"
            accent="warning"
            width="small"
            class="mx-1 my-1"
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
  computed: {
    tocData() {
      const ogData = this.data;
      const sortOrder = [
        'mission',
        'teams',
        'people',
        'opportunities',
        'facilities',
        'diversity',
      ];
      const sortedData = ogData.sort((a, b) => {
        return sortOrder.indexOf(a.slug) - sortOrder.indexOf(b.slug);
      });
      return sortedData.map((d, i) => {
        return {
          name: d.title,
          link: `#${this.urlize(d.title)}`,
          icon: { name: d.icon, family: 'light' },
        };
      });
    },
    orderedPeople() {
      const d = this.data;
      const people = d.find((d) => d.title === 'People').data;
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
