<template>
  <main class="storage-section pt-6 mt-6">
    <div class="comparison-container sticky has-background-white">
      <ul
        v-for="(service, index) in data"
        :key="index"
        class="comparison-item subtitle"
      >
        {{
          service.service | humanize
        }}
      </ul>
    </div>
    <div class="comparison-wrapper">
      <div
        v-for="(cat, ind) in categories"
        :key="cat"
        class="px-4 py-4"
        :class="[
          ind % 2 === 0 ? 'has-background-light' : 'has-background-white'
        ]"
      >
        <h2 class="subtitle">{{ cat | humanize }}</h2>
        <div class="comparison-container">
          <ul
            v-for="(service, index) in data"
            :key="index"
            class="comparison-item"
          >
            <div
              v-for="(feat, i) in service.features"
              :key="'feat' + i"
              class="class-container"
            >
              <div v-if="feat.name === cat" class="class-item">
                <span v-if="feat.class === 'fast'" class="title class-item"
                  ><fa
                    size="2x"
                    :icon="['fas', 'tachometer-average']"
                    class="has-text-warning"
                  />{{ feat.class }}</span
                >
                <span
                  v-else-if="feat.class === 'faster'"
                  class="title class-item"
                  ><fa
                    size="2x"
                    :icon="['fas', 'tachometer-fast']"
                    class="has-text-link"
                  />{{ feat.class }}</span
                >
                <span
                  v-else-if="feat.class === 'fastest'"
                  class="title class-item"
                  ><fa
                    size="2x"
                    :icon="['fas', 'tachometer-fastest']"
                    class="has-text-success"
                  />{{ feat.class }}</span
                >
                <span v-else-if="feat.class === true" class="title class-item"
                  ><fa
                    size="2x"
                    :icon="['fal', 'check']"
                    class="has-text-success"
                  />Yes</span
                >
                <span
                  v-else-if="feat.class === 'partial'"
                  class="title class-item"
                  ><fa
                    size="2x"
                    :icon="['fal', 'check']"
                    class="has-text-success"
                  />{{ feat.class }}</span
                >
                <span v-else-if="feat.class === false" class="title class-item"
                  ><fa
                    size="2x"
                    :icon="['fal', 'times']"
                    class="has-text-danger"
                  />No</span
                >
                <span
                  v-else-if="[1, 2, 3].includes(feat.class)"
                  class="title class-item"
                  ><fa
                    size="2x"
                    :icon="['fas', 'shield']"
                    :class="[
                      feat.class === 2 ? 'has-text-warning' : 'has-text-danger'
                    ]"
                  />{{ feat.class }}</span
                >
                <span v-else class="title">{{ feat.class }}</span>
                <ul>
                  <li v-for="(note, j) in feat.notes" :key="j">
                    {{ note }}
                  </li>
                </ul>
              </div>
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
    }
  },
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss">
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
  width: 120ch;
}
.comparison-item.subtitle {
  width: 12ch;
  font-size: 1.7rem;
  font-weight: bold;
}
.class-container {
  width: 20ch;
  display: flex;
  justify-content: center;
}
.class-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 1rem;
  padding: 2rem;
  opacity: 90%;
}
.storage-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
