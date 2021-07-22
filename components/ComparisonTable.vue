<template>
  <main class="storage-section pt-6 mt-6">
    <div class="px-4 has-background-dark sticky comparison-header">
      <div class="comparison-container">
        <ul
          v-for="(service, index) in services"
          :key="index"
          class="comparison-item subtitle has-text-light has-text-centered"
        >
          {{
            service.service | humanize
          }}
        </ul>
      </div>
    </div>
    <div class="comparison-wrapper">
      <div
        v-for="(category, ind) in categories"
        :key="category"
        class="px-4 py-4"
        :class="[
          ind % 2 === 0 ? 'has-background-light' : 'has-background-white',
        ]"
      >
        <h2 class="category-header subtitle">{{ category | humanize }}</h2>
        <div class="comparison-container">
          <ul
            v-for="(service, index) in services"
            :key="index"
            class="comparison-item"
          >
            <div
              v-if="service.features[ind].name === category"
              class="class-container class-item"
            >
              <span
                v-if="
                  typeof service.features[ind].class === 'string' &&
                  service.features[ind].class.startsWith('fast')
                "
                class="subtitle class-item"
              >
                <span
                  :class="[
                    'icon',
                    'is-size-3',
                    service.features[ind].class === 'fastest'
                      ? 'has-text-success'
                      : 'has-text-warning',
                  ]"
                  ><i class="mdi mdi-speedometer" /></span
                >{{ service.features[ind].class }}</span
              >
              <span
                v-else-if="service.features[ind].class === true"
                class="subtitle class-item"
                ><span class="icon is-size-3 has-text-success"
                  ><i class="mdi mdi-check" /></span
                >Yes</span
              >
              <span
                v-else-if="service.features[ind].class === 'partial'"
                class="subtitle class-item"
                ><span class="icon is-size-3 has-text-success"
                  ><i class="mdi mdi-check" /></span
                >{{ service.features[ind].class }}</span
              >
              <span
                v-else-if="service.features[ind].class === false"
                class="subtitle class-item"
                ><span class="icon is-size-3 has-text-danger"
                  ><i class="mdi mdi-close" /></span
                >No</span
              >
              <span
                v-else-if="[1, 2, 3].includes(service.features[ind].class)"
                class="subtitle class-item"
                ><span class="icon is-size-3 has-text-warning"
                  ><i class="mdi mdi-shield-half-full" /></span
                >{{ service.features[ind].class }}</span
              >
              <span v-else class="subtitle">{{
                service.features[ind].class
              }}</span>
              <ul>
                <li
                  v-for="(note, j) in service.features[ind].notes"
                  :key="j"
                  class="note"
                >
                  {{ note }}
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
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
.comparison-wrapper {
  overflow-x: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .subtitle {
    font-weight: bold;
  }
}
.comparison-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}
.comparison-header {
  z-index: 10;
}
.comparison-item.subtitle {
  width: 10rem;
  font-size: 1.2rem;
  font-weight: bold;
}
.class-container {
  width: 10rem;
  display: flex;
  justify-content: center;
}
.class-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @extend .mb-2;
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0rem;
  padding: 1rem;
}
.storage-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.category-header {
  @extend .button;
  @extend .is-outlined;
  @extend .is-static;
  @extend .mb-2;
  background-color: transparent;
  border-radius: 0;
  border-width: 2px;
  z-index: 0;
}
.note {
  @extend .has-text-centered;
  margin: 0 0.5rem;
  padding-bottom: 0.5rem;
  line-height: 1.2;
}
</style>
