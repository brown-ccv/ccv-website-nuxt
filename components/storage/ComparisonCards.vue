<template>
  <div
    class="is-flex is-justify-content-space-around is-flex-direction-row is-flex-wrap-wrap"
  >
    <DCard
      v-for="(service, j) in services"
      :key="'item' + j"
      variant="light"
      accent="link"
      width="medium-small"
      class="mx-3 my-3 px-3"
    >
      <template #header>
        <h2 class="title is-size-4">{{ humanize(service.name) }}</h2>
      </template>

      <template #content>
        <ul class="has-text-left">
          <li v-for="(feature, k) in service.features" :key="k">
            <div
              class="is-flex is-justify-content-space-between is-align-items-center"
            >
              <p>{{ humanize(feature.name) }}</p>
              <ComparisonCellContent
                :feature="feature"
                :icon-size="6"
                :font-size="6"
                flex-direction="row"
                :include-notes="false"
                :padding="false"
              />
            </div>
          </li>
        </ul>
      </template>
    </DCard>
  </div>
</template>

<script>
import DCard from '@/components/base/DCard.vue';
import ComparisonCellContent from '@/components/storage/ComparisonCellContent.vue';
import { humanize } from '@/utils';

export default {
  components: {
    DCard,
    ComparisonCellContent,
  },
  props: {
    services: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    humanize,
  },
};
</script>
