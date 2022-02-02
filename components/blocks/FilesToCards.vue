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
              v-if="
                link.target.startsWith('http') ||
                link.target.startsWith('mailto')
              "
              :href="link.target"
              class="
                m-1
                link-item
                d-button
                has-background-link has-text-white has-text-weight-semibold
                is-size-5
                link-button
              "
            >
              {{ link.text.toUpperCase() }}
              <span class="icon ml-2">
                <i class="mdi mdi-menu-right" />
              </span>
            </a>
            <nuxt-link
              v-else
              :to="link.target"
              class="
                m-1
                link-item
                d-button
                has-background-link has-text-white has-text-weight-semibold
                is-size-5
                link-button
              "
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
            <template v-for="(tagClass, tagType) in tagColors">
              <span
                v-for="tag in item[tagType]"
                :key="tag"
                class="radius-0 tag m-1"
                :class="tagClass"
              >
                {{ tag }}
              </span>
            </template>
            <h2 class="title has-text-black pt-3">{{ item.title }}</h2>
            <div v-if="item.date">Updated: {{ item.date }}</div>
            <template
              ><span>
                <div
                  v-for="(contributorArray, contributorType) in contributors(
                    item
                  )"
                  :key="contributorType"
                >
                  <div>
                    <i
                      v-if="contributorArray"
                      :class="[
                        'mdi',
                        contributorIcon[contributorType],
                        'mdi-24px',
                      ]"
                    ></i>
                  </div>
                  <span v-for="(entry, index) in contributorArray" :key="entry">
                    <a :href="contributorLink(entry)">{{ entry.name }}</a
                    ><span v-if="index + 1 < contributorArray.length">, </span>
                  </span>
                </div>
              </span></template
            >
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
    tagColors: { tags: 'is-link', groups: 'is-yellow', languages: 'is-info' },
    contributorIcon: {
      investigators: 'mdi-brain',
      people: 'mdi-account-multiple',
    },
  }),
  computed: {
    cardTags() {
      const tags = ['tags', 'groups', 'languages']
        .map((tagType) => this.data.map((card) => card[tagType]))
        .flat(2)
        .filter((e) => e);
      return tags.filter((tag, index) => tags.indexOf(tag) === index).sort();
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
            return this.searchGroup.some((tag) =>
              ['tags', 'groups', 'languages'].some((tagType) =>
                card[tagType].includes(tag)
              )
            );
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
    contributors(card) {
      const subset = (({ investigators, people }) => ({
        investigators,
        people,
      }))(card);
      return subset;
    },
    contributorLink(contributor) {
      if ('link' in contributor) {
        return contributor.link;
      } else if ('github_user' in contributor) {
        return 'https://github.com/' + contributor.github_user;
      } else {
        return undefined;
      }
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
