<template>
  <div class="storage-section my-6">
    <table class="centered">
      <thead class="has-background-dark sticky">
        <tr>
          <th />
          <th
            v-for="service in services"
            :key="'header-' + service.service"
            class="header-cell"
          >
            {{ service.service | humanize }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, ind) in categories" :key="'row-' + category">
          <th class="header-cell has-background-dark sticky-left">
            {{ category | humanize }}
          </th>
          <td
            v-for="(service, index) in services"
            :key="index"
            :class="[
              ind % 2 === 0 ? 'has-background-light' : 'has-background-white',
            ]"
          >
            <ComparisonCellContent
              v-if="service.features[ind].name === category"
              :feature="service.features[ind]"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ComparisonCellContent from '@/components/storage/ComparisonCellContent.vue';
export default {
  components: {
    ComparisonCellContent,
  },
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/_/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    },
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
};
</script>

<style lang="scss" scoped>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
}
.sticky-left {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 9;
}
.centered {
  margin: 0 auto;
}

.storage-section {
  position: relative;
  width: 100vw;
}

.header-cell {
  @extend .p-2;
  @extend .has-text-light;
  @extend .has-text-centered;
  @extend .is-size-5;
  line-height: 1.1;
  width: 10rem;
}
</style>
