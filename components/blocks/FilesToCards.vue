<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div
      v-if="
        $route.params.main === 'help' ||
        $route.params.main === 'services' ||
        ($route.params.main === 'our-work' && !$route.params.category)
      "
      class="
        card-container
        is-flex
        mt-6
        is-justify-content-space-evenly is-flex-wrap-wrap
      "
    >
      <DCard
        v-for="(item, i) in filteredData"
        :key="'help-card-' + i"
        class="help-card my-5"
        variant="light"
        accent="warning"
        width="large"
      >
        <template #header>
          <div class="px-5">
            <span v-if="item.mdi" class="icon is-size-1 has-text-success mb-5">
              <i :class="[item.mdi.prefix, `mdi-${item.mdi.icon}`]" />
            </span>

            <h2 class="title has-text-black">
              {{ item.title }}
            </h2>
          </div>
        </template>
        <template #content>
          <p class="card-p is-size-5 mt-4">{{ item.description }}</p>
        </template>
        <template #footer>
          <div v-for="link in item.links" :key="link.text">
            <a
              v-if="link.target.startsWith('http')"
              :href="link.target"
              class="d-button is-dark has-text-light mx-5 mb-5"
            >
              {{ link.text.toUpperCase() }}
              <span class="icon ml-2">
                <i class="mdi mdi-menu-right" />
              </span>
            </a>
            <nuxt-link
              v-else
              :to="link.target"
              class="d-button is-dark has-text-light mx-5 mb-5"
            >
              {{ link.text.toUpperCase() }}
              <span class="icon ml-2">
                <i class="mdi mdi-menu-right" />
              </span>
            </nuxt-link>
          </div>
        </template>
      </DCard>
    </div>
    <div v-else>
      <div class="columns column is-8 is-offset-1">
        <span class="column is-three-quarters">
          <multiselect
            v-model="searchGroup"
            :options="cardTags()"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            :multiple="true"
            placeholder="Select tags to filter by"
            :allow-empty="true"
          >
          </multiselect>
        </span>
        <span class="column">
          <button class="button is-normal is-warning" @click="clearAll">
            Clear Filters
          </button>
        </span>
      </div>
      <div class="columns column is-8 is-offset-1">
        <span class="column is-three-quarters">
          <multiselect
            v-model="sortBy"
            :options="sortByOptions()"
            :close-on-select="true"
            :clear-on-select="false"
            :multiple="false"
            :preselect-first="true"
            placeholder="Sort by"
            label="name"
            track-by="name"
            >\
          </multiselect>
        </span>
        <span class="column">
          <button
            class="button is-normal is-warning"
            @click="ascending = !ascending"
          >
            <i v-if="ascending" class="mdi mdi-sort-ascending"></i>
            <i v-else class="mdi mdi-sort-descending"></i>
          </button>
        </span>
      </div>
      <div
        class="
          card-container
          is-flex
          mt-6
          is-justify-content-space-evenly is-flex-wrap-wrap
        "
      >
        <DCard
          v-for="(item, i) in sortedArray"
          :key="'help-card-' + i"
          class="mx-3 my-3 px-3"
          variant="light"
          accent="link"
          width="medium"
        >
          <template #header>
            <span v-if="item.group" class="radius-0 tag is-link has-text-light"
              ><span class="icon"><i class="mdi mdi-account-multiple" /></span
              ><abbr :title="item.group | expandAcronym">
                {{ item.group }}
              </abbr></span
            >
            <h2>{{ item.title }}</h2>
            <div v-if="item.date">Updated: {{ item.date }}</div>
            <span v-if="item.authors" class="small has-text-link"
              >Authors: {{ item.authors.map((a) => a.name).join(', ') }}</span
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
                  >REPOSITORY<span class="icon ml-2"
                    ><i
                      class="mdi mdi-code-greater-than-or-equal" /></span></span
              ></a>
              <a
                v-if="item.links.website"
                class="link-item d-button has-text-link"
                :href="item.links.website"
                ><span
                  >WEBSITE<span class="icon ml-2"
                    ><i class="mdi mdi-link-variant" /></span></span
              ></a>
              <a
                v-if="item.links.documentation"
                class="link-item d-button has-text-link"
                :href="item.links.documentation"
                ><span
                  >DOCUMENTATION<span class="icon ml-2"
                    ><i class="mdi mdi-book" /></span></span
              ></a>
              <a
                v-if="item.links.publication"
                class="link-item d-button has-text-link"
                :href="item.links.publication"
                ><span
                  >PUBLICATION<span class="icon ml-2"
                    ><i class="mdi mdi-newspaper" /></span></span
              ></a>
              <a
                v-if="item.links.doi"
                class="link-item d-button has-text-link"
                :href="'https://' + item.links.doi"
                ><span
                  >PUBLICATION<span class="icon ml-2"
                    ><i class="mdi mdi-newspaper" /></span></span
              ></a>
            </div>
          </template>
        </DCard>
      </div>
    </div>
  </main>
</template>

<script>
import DCard from '@/components/base/DCard.vue';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    DCard,
    Multiselect,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    ascending: true,
    sortBy: [],
    searchGroup: [],
    sortOptions: [],
  }),
  computed: {
    filteredData() {
      return this.data.filter((d) => !d.hidden);
    },
    sortedArray() {
      let filtered = this.data;
      if (this.searchGroup.length > 0) {
        filtered = this.data.filter((card) => {
          if (this.searchGroup) {
            return this.searchGroup.includes(card.group);
          } else {
            return true;
          }
        });
      }

      // Sort by alphabetical order
      if (this.sortBy.name === 'Title') {
        filtered.sort((a, b) => {
          const fa = a.title.toLowerCase();
          const fb = b.title.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else if (this.sortBy.name === 'Date') {
        // Sort by date
        filtered.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
      }

      // Show sorted array in descending or ascending order
      if (!this.ascending) {
        filtered.reverse();
      }

      return filtered;
    },
  },
  methods: {
    cardTags() {
      const tags = this.data.map((card) => card.group);
      return tags
        .filter((group, index) => tags.indexOf(group) === index)
        .sort();
    },
    sortByOptions() {
      let hasDate = false;
      for (let i = 0; i < this.data.length; i++) {
        if("date" in this.data[i]) {
          hasDate = true;
          break;
        }
      }
      const options = [{ name: 'Title' }];
      if (hasDate) {
        options.push({ name: 'Date' });
      } 
      return options;

      // mary's way - currently not working
      // const hasDate = this.data.some((card) => card.hasOwnProperty('date'));

      // const options = [{ name: 'Title' }];
      // if (hasDate) {options.push({ name: 'Date' })};

      // return options;
    },
    clearAll() {
      this.searchGroup = [];
    },
  },
};
</script>

<!-- see assets/scss/_layout.scss for relevant styles -->
<style lang="scss" scoped>
.card-container {
  width: 160ch;
}

.help-card h2 {
  font-weight: bold;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
