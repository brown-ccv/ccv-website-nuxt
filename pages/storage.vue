<template>
  <div>
    <DHero
      variant="primary"
      :title="index.title"
      :subtitle="index.description"
    />
    <div class="storage-header">
      <h2>{{ index.storage_tool_header }}</h2>
      <span>
        <DButton
          type="button"
          name="clear all"
          class="mt-5"
          variant="light"
          @click="clearAll"
        >
          <template v-slot:icon-right>
            <span class="icon">
              <DIcon class="small-icon" name="redo" family="light" />
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
            <DIcon class="small-icon" name="arrow-down" family="light" />
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
            <DIcon class="small-icon" name="arrow-down" family="light" />
          </span>
        </a>
      </span>
    </div>
    <div class="selection-container">
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
      <fa
        :icon="['fas', 'exclamation-triangle']"
        size="3x"
        class="has-text-warning"
      />
      <p class="title py-6 px-6">
        No services selected, answer some of the questions or select a service
        above.
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DHero, DButton, DIcon } from '@brown-ccv/disco-vue-components';

export default {
  components: {
    DHero,
    DButton,
    DIcon
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
      this.filterServices();
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
    }
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/helpers/spacing';
.questions-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.selection-container {
  @extend .mt-6;
  display: flex;
  justify-content: space-around;
}

.storage-header {
  @extend .py-6;
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
