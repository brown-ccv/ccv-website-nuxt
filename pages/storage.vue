<template>
  <div>
    <DHero
      variant="primary"
      :title="index.title"
      :subtitle="index.description"
    />
    <div class="questions-container">
      <MultipleChoice
        v-for="(q, i) in questions"
        :key="'q' + i"
        :data="q"
        @answer="recordAnswer"
      />
    </div>
    <ComparisonTable
      :key="'key' + componentKey"
      :data="filteredServices"
      :categories="categories"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DHero } from '@brown-ccv/disco-vue-components';
export default {
  components: {
    DHero
  },
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/_/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    }
  },
  async fetch({ store, error }) {
    await store.dispatch('content/fetchData', {
      main: 'services',
      category: 'file-storage-and-transfer'
    });
  },
  data() {
    return {
      answers: {},
      answerPayload: {},
      componentKey: 0,
      filteredServices: {}
    };
  },
  computed: {
    ...mapState({
      index: (state) => state.content.index
    }),
    services: {
      get() {
        return this.index.services;
      },
      set(newVal, oldVal) {
        return newVal;
      }
    },
    categories() {
      return this.services[0].features.map((feat) => feat.name);
    },
    questions() {
      return this.index.questions;
    }
  },
  watch: {
    answerPayload() {
      this.answers[this.answerPayload[0]] = this.answerPayload[1];
      const filtered = this.filteredServices.filter((s) =>
        this.answerPayload[1].includes(
          s.features.filter((f) => f.name === this.answerPayload[0])[0].class
        )
      );
      this.filteredServices = filtered;
    }
  },
  mounted() {
    this.filteredServices = this.services;
  },
  methods: {
    recordAnswer(payload) {
      this.answerPayload = payload;
      this.componentKey += 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.questions-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
