<template>
  <div>
    <DHero
      variant="primary"
      :title="index.title"
      :subtitle="index.description"
    />
    <div class="storage-header py-6">
      <h2>{{ index.storage_tool_header }}</h2>
      <span>
        <DButton
          type="button"
          name="clear all"
          class="mt-5"
          variant="light"
          @click="clearAll"
        >
          <template #icon-right>
            <span class="icon">
              <i class="mdi mdi-refresh" />
            </span>
          </template>
        </DButton>

        <a
          v-if="selectedServices.length > 0"
          class="d-button ml-2 mt-5 has-background-dark has-text-light"
          href="#comparison-table"
          name="go to comparison table"
        >
          GO TO COMPARISON TABLE
          <span class="icon ml-2">
            <i class="mdi mdi-arrow-down" />
          </span>
        </a>

        <a
          v-else
          class="d-button ml-2 mt-5 has-background-dark has-text-light"
          href="#comparison-table"
          name="go to comparison table"
          disabled
        >
          GO TO COMPARISON TABLE
          <span class="icon ml-2">
            <i class="mdi mdi-arrow-down" />
          </span>
        </a>
      </span>
    </div>
    <div class="selection-container mt-6">
      <div class="questions-container">
        <MultipleChoice
          v-for="(q, i) in questions"
          :key="'q' + i"
          :ref="'q' + i"
          :data="q"
          class="mb-6"
          @answer="recordAnswer"
          @clear="clear"
        />
      </div>
      <ServiceSelection
        :data="services"
        :selected-data="selectedServices"
        @service="recordService"
      />
    </div>
    <ComparisonTable
      v-if="selectedServices.length > 0"
      id="comparison-table"
      :data="filteredServices"
      :categories="categories"
    />
    <div v-else class="storage-section py-6 mx-6 my-6 has-background-light">
      <span class="icon is-size-2 has-text-warning">
        <i class="mdi mdi-alert" />
      </span>
      <p class="title py-6 px-6">
        No services selected, answer some of the questions or select a service
        above.
      </p>
    </div>
  </div>
</template>

<script>
import DHero from '@/components/base/DHero.vue';
import DButton from '@/components/base/DButton.vue';
import MultipleChoice from '@/components/base/MultipleChoice.vue';
import ServiceSelection from '@/components/ServiceSelection.vue';
import ComparisonTable from '@/components/ComparisonTable.vue';

export default {
  components: {
    DHero,
    DButton,
    MultipleChoice,
    ServiceSelection,
    ComparisonTable,
  },
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/_/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    },
  },
  async asyncData({ $content }) {
    const index = await $content(
      'services/file-storage-and-transfer/index'
    ).fetch();

    return { index };
  },
  data() {
    return {
      answers: {},
      answerPayload: {},
      selectedServices: [],
      filteredServices: [],
    };
  },
  computed: {
    services: {
      get() {
        return this.index.services;
      },
      set(newVal, oldVal) {
        return newVal;
      },
    },
    categories() {
      return this.services[0].features.map((feat) => feat.name);
    },
    questions() {
      return this.index.questions;
    },
  },
  watch: {
    answerPayload() {
      this.answers[this.answerPayload[0]] = this.answerPayload[1];
      this.filterServices();
    },
    selectedServices() {
      this.filteredServices = this.services.filter((s) =>
        this.selectedServices.includes(s.service)
      );
    },
  },
  mounted() {
    this.filteredServices = this.services;
  },
  methods: {
    filterServices() {
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
    recordAnswer(payload) {
      this.answerPayload = payload;
    },
    recordService(payload) {
      this.selectedServices = payload;
    },
    clear(payload) {
      delete this.answers[payload];
      this.filterServices();
    },
    clearAll() {
      this.answers = {};
      this.answersPayload = {};
      this.selectedServices = [];
      this.filteredServices = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.questions-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.selection-container {
  display: flex;
  justify-content: space-around;
}

.storage-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    width: 80ch;
    font-size: 1.6rem;
  }
}
</style>
