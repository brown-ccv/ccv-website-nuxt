<template>
  <div class="card-group">
    <template v-for="(item, j) in data">
      <DCard
        :key="'item' + j"
        variant="light"
        accent="link"
        width="medium"
        class="mx-3 my-3 px-3"
      >
        <template #header>
          <span v-if="item.group" class="radius-0 tag is-link has-text-light"
            ><fa :icon="['fal', 'users']" class="mr-2" /><abbr
              :title="item.group | expandAcronym"
            >
              {{ item.group }}
            </abbr></span
          >

          <h2>{{ item.title }}</h2>
          <span class="small has-text-link"
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
                >REPOSITORY<fa
                  class="ml-2"
                  :icon="['fal', 'code-merge']"/></span
            ></a>
            <a
              v-if="item.links.website"
              class="link-item d-button has-text-link"
              :href="item.links.website"
              ><span
                >WEBSITE<fa
                  class="ml-2"
                  :icon="['fal', 'external-link']"/></span
            ></a>
            <a
              v-if="item.links.documentation"
              class="link-item d-button has-text-link"
              :href="item.links.documentation"
              ><span
                >DOCUMENTATION<fa class="ml-2" :icon="['fal', 'book']"/></span
            ></a>
            <a
              v-if="item.links.publication"
              class="link-item d-button has-text-link"
              :href="item.links.publication"
              ><span
                >PUBLICATION<fa
                  class="ml-2"
                  :icon="['fal', 'newspaper']"/></span
            ></a>
            <a
              v-if="item.links.doi"
              class="link-item d-button has-text-link"
              :href="'https://' + item.links.doi"
              ><span
                >PUBLICATION<fa
                  class="ml-2"
                  :icon="['fal', 'newspaper']"/></span
            ></a>
          </div>
        </template>
      </DCard>
    </template>
  </div>
</template>

<script>
import { DCard } from '@brown-ccv/disco-vue-components';

export default {
  components: {
    DCard
  },
  filters: {
    expandAcronym(str) {
      const abbrMap = {
        CBC: 'Computational Biology Core',
        CCV: 'Center for Computation and Visualization',
        DSCOV: 'Data Science, Computing and Visualization Series'
      };
      return abbrMap[str];
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  }
};
</script>
