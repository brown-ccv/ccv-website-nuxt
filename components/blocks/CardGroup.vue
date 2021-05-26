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
    </template>
  </div>
</template>

<script>
import DCard from '@/components/base/DCard';

export default {
  components: {
    DCard,
  },
  filters: {
    expandAcronym(str) {
      const abbrMap = {
        CBC: 'Computational Biology Core',
        CCV: 'Center for Computation and Visualization',
        DSCOV: 'Data Science, Computing and Visualization Series',
      };
      return abbrMap[str];
    },
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<!-- see assets/scss/_layout.scss for relevant styles -->
