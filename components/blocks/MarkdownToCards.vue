<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div class="container">
      <div
        class="
          multiselect-header
          mt-4
          mb-1
          is-flex is-flex-wrap-wrap is-justify-content-space-evenly
        "
      >
        Filter posts by:
      </div>
      <div
        class="
          dropdown
          is-flex is-flex-wrap-wrap is-justify-content-space-evenly
        "
      >
        <div
          class="mb-1 is-flex is-justify-content-space-evenly is-flex-wrap-wrap"
        >
          <div
            v-for="(cat, index) in tagCategories"
            :key="cat"
            class="mb-1 mr-4"
          >
            <div class="multiselect-header">
              {{ cat[0].toUpperCase() + cat.substring(1) }}
            </div>
            <div class="is-flex">
              <multiselect
                v-model="searchGroup[index]"
                label="name"
                track-by="tagCode"
                :options="cardTags(cat)"
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
      </div>
      <div
        class="
          multiselect-header
          mt-5
          mb-1
          is-flex is-flex-wrap-wrap is-justify-content-space-evenly
        "
      >
        Sort posts by:
      </div>
      <div
        class="
          dropdown
          is-flex is-flex-wrap-wrap is-justify-content-space-evenly
        "
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
          accent="warning"
          width="medium"
        >
          <template #header>
            <template>
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="radius-0 tag m-1 mb-5 is-yellow"
              >
                {{ tag }}
              </span>
            </template>
            <div class="px-5">
              <h2 class="title has-text-black">
                {{ item.title }}
              </h2>
              <h2 class="subtitle has-text-black">Author: {{ item.author }}</h2>
              <h2 class="subtitle has-text-black">
                {{ new Date(item.date).toDateString() }}
              </h2>
              <h2 class="has-text-black">
                {{ item.toc }}
              </h2>
            </div>
          </template>
          <template #footer>
            <nuxt-link
              :to="`/blog/${item.slug}`"
              class="
                m-1
                link-item
                d-button
                has-background-link has-text-white has-text-weight-semibold
                is-size-5
                link-button
              "
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
import DCard from '@/components/base/DCard.vue';
import Multiselect from 'vue-multiselect';
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
    tags: ['department', 'groups', 'tags', 'languages', 'active'],
    tagColors: {
      department: 'is-yellow',
      groups: 'is-yellow',
      tags: 'is-link',
      languages: 'is-info',
      active: 'is-info',
    },
  }),
  computed: {
    filteredData() {
      const f = this.data.filter((d) => !d.hidden);
      return f;
    },
    tagCategories() {
      // create array of tag categories (tags, departments, languages, etc. for each our work type)
      const tagCats = [];
      for (let i = 0; i < this.tags.length; i++) {
        const catExists = this.filteredData.some((o) => {
          // eslint-disable-next-line no-prototype-builtins
          return o.hasOwnProperty(this.tags[i]);
        });
        if (catExists) {
          tagCats.push(this.tags[i]);
        }
      }
      return tagCats;
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
      for (let i = 0; i < this.searchGroup.length; i++) {
        if (this.searchGroup[i] && this.searchGroup[i].length > 0) {
          filtered = filtered.filter((card) => {
            return this.searchGroup[i]
              .map((name) => name.tagCode)
              .some((tag) =>
                this.tags.some((tagType) => {
                  const tags = card[tagType] ?? [];
                  return tags.includes(tag);
                })
              );
          });
        }
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
    cardTags(category) {
      const tags = [category]
        .map((tagType) => this.filteredData.map((card) => card[tagType]))
        .flat(2)
        .filter((e) => e);
      const names = tags
        .filter((tag, index) => tags.indexOf(tag) === index)
        .sort();
      const tagCodes = names.map((item) => humanizeHero(item));
      const res = [];
      names.forEach((n, index) => {
        const code = tagCodes[index];
        res.push({ name: code, tagCode: n });
      });
      return res;
    },
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
