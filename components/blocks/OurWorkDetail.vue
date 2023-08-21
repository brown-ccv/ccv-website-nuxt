<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div class="mt-5">
      <DCard class="mx-3 my-3 px-3" variant="light" accent="light" width="full">
        <template #header>
          <template v-for="(tagClass, tagType) in tagColors">
            <span
              v-for="tag in data[tagType]"
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
              v-for="data in data.links"
              :key="data.url"
              class="m-1 link-item d-button has-background-link has-text-white has-text-weight-semibold is-size-5 link-button"
              :href="data.url"
            >
              <span>{{ data.category.toUpperCase() }} </span>
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
  },
};
</script>
