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
          name="reset"
          class="mt-5"
          variant="light"
          @click="resetAll"
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
          :data="q"
          :question-id="i"
          class="mb-6"
          :selected="answers[i]"
          @answer="recordAnswer"
          @reset="resetQuestion"
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

    const answers = index.questions.map((q) =>
      q.answers.find((answer) => answer.answer === q.default_answer)
    );

    return { index, answers };
  },
  data() {
    return {
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
    selectedServices() {
      // this.filteredServices = this.services.filter((s) =>
      //   this.selectedServices.includes(s.service)
      // );
    },
  },
  mounted() {
    this.filteredServices = this.services;
  },
  methods: {
    filterServices() {
      let filtered = this.services;
      this.answers.forEach((answer, i) => {
        filtered = filtered.filter((s) => {
          const question = this.questions[i];
          return answer.category_classes.includes(
            s.features.find((f) => f.name === question.affected_category).class
          );
        });
      });
      this.selectedServices = filtered.map((s) => s.service);
    },
    updateAnswer({ answer, id }) {
      // copy and set due to vue mutation limitatinos
      const newAnswers = [...this.answers];
      newAnswers[id] = answer;
      this.answers = newAnswers;
    },
    recordAnswer(answerPayload) {
      // copy and set due to vue mutation limitatinos
      this.updateAnswer(answerPayload);
    },
    recordService(payload) {
      this.selectedServices = payload;
    },
    resetQuestion({ id }) {
      const question = this.questions[id];
      const answer = question.answers.find(
        (a) => a.answer === question.default_answer
      );
      this.updateAnswer({ answer, id });
    },
    resetAll() {
      this.answers = this.index.questions.map((q) =>
        q.answers.find((answer) => answer.answer === q.default_answer)
      );
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
