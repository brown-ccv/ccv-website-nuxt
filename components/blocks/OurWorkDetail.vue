<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div class="mt-5">
      <DCard
        class="mx-3 my-3 px-3"
        variant="light"
        accent="light"
        width="large"
      >
        <template #header>
          <template v-for="(tagClass, tagType) in tagColors">
            <span
              v-for="tag in filteredData[tagType]"
              :key="tag"
              class="radius-0 tag m-1"
              :class="tagClass"
            >
              {{ tag }}
            </span>
          </template>
          <h2 class="title has-text-black pt-3">{{ data.title }}</h2>
          <div v-if="data.date">Updated: {{ data.date }}</div>
          <span>
            <div
              v-for="(contributorArray, contributorType) in contributors(data)"
              :key="contributorType"
            >
              <div>
                <i
                  v-if="contributorArray"
                  :class="['mdi', contributorIcon[contributorType], 'mdi-24px']"
                ></i>
              </div>
              <span
                v-for="(entry, index) in contributorArray"
                :key="entry.name"
              >
                <a
                  v-if="contributorType === 'people'"
                  :href="
                    'https://directory.brown.edu/uuid/' +
                    find_uuid(entry.name).brown_directory_uuid
                  "
                  aria-label="information icon"
                  ><span class="icon"><i class="mdi mdi-information" /></span>
                </a>
                <a :href="contributorLink(entry)">{{ entry.name }}</a
                ><span v-if="index + 1 < contributorArray.length">, </span>
              </span>
            </div>
          </span>
          <div>
            <p>{{ data.description }}</p>
          </div>
        </template>
        <template #footer>
          <section v-if="data.links" class="link-group">
            <div><i class="mdi mdi-link p-1 title"></i></div>
            <a
              v-for="d in data.links"
              :key="d.url"
              class="m-1 link-item d-button has-background-link has-text-white has-text-weight-semibold is-size-5 link-button"
              :href="d.url"
            >
              <span>{{ d.category.toUpperCase() }} </span>
            </a>
          </section>
        </template>
      </DCard>
    </div>
  </main>
</template>

<script>
import DCard from '@/components/base/DCard.vue';
export default {
  components: {
    DCard,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    people: {
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
      const f = [this.data].filter((d) => !d.hidden);
      f.forEach(function (obj) {
        for (const key in obj) {
          if (obj[key] === false) {
            obj[key] = ['inactive'];
          } else if (obj[key] === true) {
            obj[key] = ['active'];
          }
        }
      });
      return f[0];
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
    common(a, b) {
      return b.filter(Set.prototype.has.bind(new Set(a)));
    },
    find_uuid(name) {
      const person = this.people[0].data.find((item) => item.name === name);
      return person;
    },
  },
};
</script>
