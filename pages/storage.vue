<template>
  <div>
    <DHero
      variant="primary"
      :title="index.title"
      :subtitle="index.description"
    />
    <div class="selection-container">
      <div class="questions-container">
        <MultipleChoice
          v-for="(q, i) in questions"
          :key="'q' + i"
          :data="q"
          class="mb-6"
          @answer="recordAnswer"
        />
      </div>
      <ServiceSelection
        :data="services"
        :selected-data="filteredServices.map((s) => s.service)"
        @service="recordService"
      />
    </div>
    <ComparisonTable :data="filteredServices" :categories="categories" />
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
      selectedServices: [],
      filteredServices: []
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
      let filtered = this.services;
      const ans = Object.keys(this.answers);
      ans.forEach((a) => {
        filtered = filtered.filter((s) => {
          return this.answers[a].includes(
            s.features.filter((f) => f.name === a)[0].class
          );
        });
      });
      this.selectedServices = filtered.map((s) => s.service);
    },
    selectedServices() {
      this.filteredServices = this.services.filter((s) =>
        this.selectedServices.includes(s.service)
      );
    }
  },
  mounted() {
    this.filteredServices = this.services;
  },
  methods: {
    recordAnswer(payload) {
      this.answerPayload = payload;
    },
    recordService(payload) {
      this.selectedServices = payload;
    }
  }
};
</script>

<style lang="scss">
@import 'bulma';
.questions-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.service-box {
  @extend .box;
  @extend .my-1;
  @extend .mx-4;
  height: 10rem;
  width: 10rem;
  label {
    font-weight: bold;
  }
}
.selection-container {
  @extend .mt-6;
  display: flex;
  justify-content: space-around;
}
.service-selection {
  display: flex;
  flex-basis: 40%;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>
