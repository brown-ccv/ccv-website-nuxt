<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div
      v-if="
        $route.params.main === 'help' ||
        $route.params.main === 'services' ||
        ($route.params.main === 'our-work' && !$route.params.category)
      "
      class="card-container is-flex mt-6 is-justify-content-space-evenly is-flex-wrap-wrap"
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
              class="m-1 link-item d-button has-background-link has-text-white has-text-weight-semibold is-size-5 link-button"
            >
              {{ link.text.toUpperCase() }}
              <span class="icon ml-2">
                <i class="mdi mdi-menu-right" />
              </span>
            </a>
            <nuxt-link
              v-else
              to="/"
              class="m-1 link-item d-button has-background-link has-text-white has-text-weight-semibold is-size-5 link-button"
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
        class="multiselect-header mt-4 mb-1 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
      >
        Filter cards by:
      </div>
      <div
        class="dropdown is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
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
          </div>
        </div>
      </div>
      <div class="has-text-centered">
        <button class="ml-1 button is-normal is-warning" @click="clearAll">
          Clear Filters
        </button>
      </div>
      <div
        class="multiselect-header mt-5 mb-1 is-flex is-flex-wrap-wrap is-justify-content-space-evenly"
      >
        Sort cards by:
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
          @click.native="$router.push(`${item.path}`)"
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
            <span>
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
                <span
                  v-for="(entry, index) in contributorArray"
                  :key="entry.name"
                >
                  <a :href="contributorLink(entry)">{{ entry.name }}</a
                  ><span v-if="index + 1 < contributorArray.length">, </span>
                </span>
              </div>
            </span>
          </template>
          <template #content>
            {{ truncateDescription(item.description) }}
            <nuxt-link :to="'${item.path}'">...Read More</nuxt-link>
          </template>
        </DCard>
      </div>
    </div>
  </main>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { humanizeHero } from '@/utils';
import DCard from '@/components/base/DCard.vue';

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
    contributorIcon: {
      investigators: 'mdi-brain',
      people: 'mdi-account-multiple',
    },
  }),
  computed: {
    filteredData() {
      const f = this.data.filter((d) => !d.hidden);
      f.forEach(function (obj) {
        for (const key in obj) {
          if (obj[key] === false) {
            obj[key] = ['inactive'];
          } else if (obj[key] === true) {
            obj[key] = ['active'];
          }
        }
      });
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
      // eslint-disable-next-line no-prototype-builtins
      const hasDate = this.data.some((card) => card.hasOwnProperty('date'));
      // eslint-disable-next-line no-prototype-builtins
      const hasActiveTag = this.filteredData.some((card) =>
        // eslint-disable-next-line no-prototype-builtins
        card.hasOwnProperty('active')
      );

      const options = [{ name: 'Title' }];
      if (hasDate) {
        options.push({ name: 'Date' });
      } else if (hasActiveTag) {
        options.push({ name: 'Active' });
      }
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
      } else if (this.sortBy.name === 'Active') {
        // Sort by active
        filtered.sort((a, b) => {
          const fa = a.active;
          const fb = b.active;
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
    common(a, b) {
      return b.filter(Set.prototype.has.bind(new Set(a)));
    },
    truncateDescription(string) {
      return string.split(' ').splice(0, 9).join(' ');
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
