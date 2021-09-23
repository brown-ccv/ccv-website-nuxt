<template>
  <div>
    <template v-for="(service, j) in services">
      <DCard
        :key="'item' + j"
        variant="light"
        accent="link"
        width="medium"
        class="mx-3 my-3 px-3"
      >

        <template #header>
          <h2>{{ service.service | humanize }}</h2>
        </template>
        
        <template #content>
          <ul>
            <li v-for="(feature, k) in service.features" :key="k">
              <!-- {{ feature.name | humanize }} -->
              <span v-if="feature.class != false">
                {{ feature.name | humanize }} {{ feature.class }}
              </span>
            </li>
          </ul> 
        </template>

      </DCard>
    </template>
  </div>
</template>

<script>
import DCard from '@/components/base/DCard.vue';

export default {
  components: {
    DCard,
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

<style>
ul {
  text-align: left;
}
</style>