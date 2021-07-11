<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div
      v-if="$route.params.main === 'help'"
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
        width=large
      >
        <template #header>
          <div class="px-5">
            <span
              class="icon is-size-1 has-text-success mb-5"
            >
              <i v-if="item.mdi" :class="[item.mdi.prefix, `mdi-${item.mdi.icon}`]" />
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
    <div
      v-else
      class="
        card-container
        is-flex
        mt-6
        is-justify-content-space-evenly is-flex-wrap-wrap
      "
    >
      <div id="sort-bar">
        <select name="searchGroup" id="select" v-model="searchGroup">
          <option value="">Please select one to filter</option>
          <option value="CCV">Center for Computation and Visualization</option>
          <option value="CBC">Computational Biology Core</option>
        </select>
        <i class="fa fa-search"></i>
        <select name="sortBy" id="sort" v-model="sortBy">
          <option value="alphabetically">Alphabetically</option>
        </select>
        <button v-on:click="ascending = !ascending" class="sort-button">
          <i v-if="ascending" class="fa fa-sort-up"></i>
          <i v-else class="fa fa-sort-down"></i>
        </button>
      </div>

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
                  ><i class="mdi mdi-code-greater-than-or-equal" /></span></span
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
  </main>
</template>

<script>
import DCard from '@/components/base/DCard.vue';

export default {
  components: {
    DCard,
  },
  data:() => ({
      ascending: true,
      sortBy: 'alphabetically',
      searchGroup: ''
  }),
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filteredData() {
      return this.data.filter((d) => !d.hidden);
    },
    sortedArray() {
        let tempCards = this.data
        
        // Filter by group tag
        if (this.searchGroup !== "") {
          tempCards = tempCards.filter(item => {
              return item.group === this.searchGroup
            })
        }
        
              
        // Sort by alphabetical order
          tempCards = tempCards.sort((a, b) => {
              if (this.sortBy === 'alphabetically') {
                  const fa = a.title.toLowerCase()
                  const fb = b.title.toLowerCase()
                if (fa < fb) {
                  return -1
                }
                if (fa > fb) {
                  return 1 
                }
                return 0
              } else {
                return a.group - b.group
            }
          })
          
          // Show sorted array in descending or ascending order
          if (!this.ascending) {
            tempCards.reverse()
          }
          
          return tempCards
    }
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
