<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div class="container">
      <div
        class="multiselect-header mt-4 mb-1 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
      >
        Filter posts by tags:
      </div>
      <div
        class="dropdown is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
      >
        <div
          class="mb-1 is-flex is-justify-content-space-evenly is-flex-wrap-wrap"
        >
          <div class="is-flex">
            <multiselect
              v-model="searchGroup"
              :options="tags"
              :close-on-select="true"
              :clear-on-select="false"
              :preserve-search="true"
              :multiple="true"
              placeholder="Select one or more"
              :allow-empty="true"
            >
            </multiselect>
            <button class="ml-1 button is-normal is-warning" @click="clearAll">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      <div
        class="multiselect-header mt-5 mb-1 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
      >
        Sort posts by:
      </div>
      <div
        class="dropdown is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
      >
        <div class="mb-1 is-flex">
          <multiselect
            v-model="sortBy"
            :options="sortByOptions"
            :close-on-select="true"
            :clear-on-select="false"
            :multiple="false"
            :preselect-first="true"
            placeholder="Sort by"
            label="name"
            track-by="name"
            >\
          </multiselect>
          <button
            class="ml-1 button is-normal is-warning"
            @click="ascending = !ascending"
          >
            <i v-if="ascending" class="mdi mdi-sort-ascending"></i>
            <i v-else class="mdi mdi-sort-descending"></i>
          </button>
        </div>
      </div>
      <div
        class="card-container is-flex mt-6 is-justify-content-space-evenly is-flex-wrap-wrap"
      >
        <DCard
          v-for="(item, i) in sortedArray"
          :key="'help-card-' + i"
          class="mx-3 my-3 px-3"
          variant="light"
          accent="warning"
          width="medium"
        >
          <!-- adding comment to test submodule merge conflict resolution -->
          <template #header>
            <div>
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="radius-0 tag m-1 mb-5 is-yellow"
              >
                {{ tag }}
              </span>
            </div>
            <div class="px-5">
              <h2 class="title has-text-black">
                {{ item.title }}
              </h2>
              <h2 class="subtitle has-text-black">Author: {{ item.author }}</h2>
              <h2 class="subtitle has-text-black">
                {{ new Date(item.date).toDateString() }}
              </h2>
              <h2 class="has-text-black">
                {{ item.description }}
              </h2>
            </div>
          </template>
          <template #footer>
            <nuxt-link
              :to="`/blog/${item.slug}`"
              class="m-1 link-item d-button has-background-link has-text-white has-text-weight-semibold is-size-5 link-button"
            >
              READ MORE
            </nuxt-link>
          </template>
        </DCard>
      </div>
    </div>
  </main>
</template>

<script>
import Multiselect from 'vue-multiselect';
import DCard from '@/components/base/DCard.vue';
import { humanizeHero } from '@/utils';

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
  }),
  computed: {
    filteredData() {
      const f = this.data.filter((d) => !d.hidden);
      return f;
    },
    tags() {
      const tags = Array.from(
        new Set(this.filteredData.map(({ tags }) => tags))
      );
      return [...new Set(tags.flat(1))].sort();
    },
    sortByOptions() {
      const options = [{ name: 'Title' }];
      options.push({ name: 'Author' });
      options.push({ name: 'Date' });
      options.sort().reverse();

      return options;
    },
    sortedArray() {
      let filtered = this.filteredData;

      // Filter cards by tags in searchGroup
      if (this.searchGroup.length > 0) {
        filtered = filtered.filter((card) => {
          return this.searchGroup.some((tag) => card.tags.includes(tag));
        });
      }

      // Sort by title alphabetical order
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
      } else if (this.sortBy.name === 'Author') {
        // Sort by author
        filtered.sort((a, b) => {
          const fa = a.author.toLowerCase();
          const fb = b.author.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
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
    humanizeHero,
    clearAll() {
      this.searchGroup = [];
    },
  },
};
</script>

<!-- see assets/scss/_layout.scss for relevant styles -->
<style lang="scss" scoped>
.help-card h2 {
  font-weight: bold;
}

.dropdown {
  margin-top: 30px;
}

.multiselect {
  min-width: 225px;
}

.multiselect-header {
  font-weight: bold;
}

.link-button {
  width: 65%;
}
</style>
