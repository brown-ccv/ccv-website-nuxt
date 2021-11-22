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
            <span
              v-if="item.icon"
              class="icon is-size-1 has-text-success mb-5 mt-5"
            >
              <i :class="[`mdi mdi-${item.icon}`]" />
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
              class="m-1
                  link-item
                  d-button
                  has-background-link has-text-white has-text-weight-semibold
                  is-size-5
                  link-button"
            >
              {{ link.text.toUpperCase() }}
              <span class="icon ml-2">
                <i class="mdi mdi-menu-right" />
              </span>
            </a>
            <a
              v-else-if="link.target.startsWith('mailto')"
              :href="link.target"
              class="m-1
                  link-item
                  d-button
                  has-background-link has-text-white has-text-weight-semibold
                  is-size-5
                  link-button"
            >
              {{ link.text.toUpperCase() }}
              <span class="icon ml-2">
                <i class="mdi mdi-menu-right" />
              </span>
            </a>
            <nuxt-link
              v-else
              :to="link.target"
              class="m-1
                  link-item
                  d-button
                  has-background-link has-text-white has-text-weight-semibold
                  is-size-5
                  link-button"
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
    <div v-else class="container">
      <div
        class="
          dropdown
          is-flex is-flex-wrap-wrap is-justify-content-space-evenly
        "
      >
        <div class="mb-1 is-flex">
          <multiselect
            v-model="searchGroup"
            :options="cardTags"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            :multiple="true"
            placeholder="Select tags to filter by"
            :allow-empty="true"
          >
          </multiselect>
          <button class="ml-1 button is-normal is-warning" @click="clearAll">
            Clear Filters
          </button>
        </div>
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
            <span v-if="item.tags"
              ><abbr class="radius-0 tag is-link has-text-light m-1" v-for="tag in item.tags" :key="tag" :title="tag | expandAcronym">
                {{ tag }}
              </abbr></span
            >
            <h2 class="title has-text-black pt-3">{{ item.title }}</h2>
            <div v-if="item.date">Updated: {{ item.date }}</div>
            <div>
              <span v-if="item.people" class="subtitle has-text-black"
                ><div><i class="mdi mdi-account-multiple p-1 m-1"></i></div>
                <span v-for="(author, index) in item.people" :key="author.name"
                  ><a
                    v-if="author.github_user"
                    :href="'https://github.com/' + author.github_user"
                    >{{ author.name }}</a
                  >{{ author.github_user ? '' : author.name
                  }}<span v-if="index + 1 < item.people.length">, </span>
                </span>
              </span>
            </div>
            <div>
              <span v-if="item.investigators" class="subtitle has-text-black"
                ><div><i class="mdi mdi-account-search p-1 m-1"></i></div>
                <span v-for="(author, index) in item.investigators" :key="author.name"
                  ><a
                    v-if="author.link"
                    :href="author.link"
                    >{{ author.name }}</a
                  >{{ author.link ? '' : author.name
                  }}<span v-if="index + 1 < item.investigators.length">, </span>
                </span>
              </span>
            </div>
          </template>
          <template #content>
            {{ item.description }}
          </template>
          <template #footer>
            <section v-if="item.links" class="link-group">
              <div><i class="mdi mdi-link p-1 title"></i></div>
              <a
                v-for="link in item.links"
                :key="link.category"
                class="
                  m-1
                  link-item
                  d-button
                  has-background-link has-text-white has-text-weight-semibold
                  is-size-5
                  link-button
                "
                :href="link.url"
              >
                <span>{{ link.category.toUpperCase() }} </span>
              </a>
            </section>
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
  }),
  computed: {
    cardTags() {
      let tags = this.data.map((card) => card.tags);
      tags = tags.flat()
      return tags
        .filter((tag, index) => tags.indexOf(tag) === index)
        .sort();
    },
    sortByOptions() {
      // eslint-disable-next-line no-prototype-builtins
      const hasDate = this.data.some((card) => card.hasOwnProperty('date'));

      const options = [{ name: 'Title' }];
      if (hasDate) {
        options.push({ name: 'Date' });
      }

      return options;
    },
    filteredData() {
      return this.data.filter((d) => !d.hidden);
    },
    sortedArray() {
      let filtered = this.filteredData;
      if (this.searchGroup.length > 0) {
        filtered = filtered.filter((card) => {
          if (this.searchGroup) {
            // return this.searchGroup.includes(card.tags);
            return this.searchGroup.some(r => card.tags.includes(r) >= 0)
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

.link-button {
  width: 65%;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
