<template>
  <div class="storage-section">
    <table class="my-6">
      <thead class="has-background-dark sticky">
        <th />
        <th
          v-for="service in services"
          :key="'header-' + service.service"
          class="header-cell"
        >
          {{ service.service | humanize }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(category, ind) in categories" :key="'row-' + category">
          <th class="header-cell has-background-dark">
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
// .comparison-wrapper {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// }
// .comparison-container {
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   justify-content: space-evenly;
// }
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  padding: 1rem;
  z-index: 10;
  align-self: flex-start;
}

.storage-section {
  display: flex;
  justify-content: center;
  align-items: center;
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
