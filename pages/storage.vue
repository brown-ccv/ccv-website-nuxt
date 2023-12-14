<template>
  <div>
    <DHero variant="primary" :title="tool.title" :subtitle="tool.description" />
    <div class="storage-header py-6 px-2">
      <h2>{{ tool.storage_tool_header }}</h2>
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
          class="d-button ml-2 mt-5 has-background-dark has-text-light"
          href="#comparison-table"
          name="go to comparison table"
          :disabled="comparisonServices.length === 0"
        >
          GO TO COMPARISON
          <span class="icon ml-2">
            <i class="mdi mdi-arrow-down" />
          </span>
        </a>
      </span>
    </div>
    <div
      class="container px-2 mt-6 is-flex is-flex-wrap-wrap is-justify-content-space-between"
    >
      <div class="is-flex is-flex-direction-column is-align-items-start">
        <MultipleChoice
          v-for="(q, i) in questions"
          :key="'q' + i"
          :question="q"
          :question-id="i"
          class="mb-4"
          :selected="answers[i]"
          @answer="recordAnswer"
          @reset="resetQuestion"
        />
      </div>
      <ServiceSelection
        :services="services"
        :selected-services="selectedServices"
        :matching-services="matchingServices"
        @service="recordService"
      />
    </div>
    <ComparisonTable
      v-if="comparisonServices.length > 1"
      id="comparison-table"
      :services="comparisonServices"
      :categories="categories"
      class="is-hidden-touch"
    />
    <ComparisonCards
      v-if="comparisonServices.length === 1"
      id="comparison-table"
      :services="comparisonServices"
      :categories="categories"
      class="is-hidden-touch"
    />
    <ComparisonCards
      v-if="comparisonServices.length > 0"
      id="comparison-table"
      :services="comparisonServices"
      :categories="categories"
      class="is-hidden-desktop"
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
    <div class="is-flex is-flex-wrap-wrap is-justify-content-center mb-6">
      <a href="https://brown.co1.qualtrics.com/jfe/form/SV_a5DbCjYNMb5iU0B">
        <DButton
          type="button"
          name="Request Storage"
          class="mt-5"
          variant="link"
          size="large"
        >
          <template #icon-right>
            <span class="icon">
              <i class="mdi mdi-server" />
            </span>
          </template>
        </DButton>
      </a>
    </div>
  </div>
</template>

<script>
import DHero from '@/components/base/DHero.vue';
import DButton from '@/components/base/DButton.vue';
import MultipleChoice from '@/components/storage/MultipleChoice.vue';
import ServiceSelection from '@/components/storage/ServiceSelection.vue';
import ComparisonTable from '@/components/storage/ComparisonTable.vue';
import ComparisonCards from '@/components/storage/ComparisonCards.vue';

export default {
  components: {
    DHero,
    DButton,
    MultipleChoice,
    ServiceSelection,
    ComparisonTable,
    ComparisonCards,
  },
  async asyncData({ $content }) {
    const tool = await $content('storage-tool').fetch();
    tool.services.forEach((service) =>
      service.features.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      )
    );

    const answers = tool.questions.map((q) =>
      q.answers.find((answer) => answer.answer === q.default_answer)
    );

    return { tool, answers };
  },
  data() {
    return {
      selectedServices: [],
    };
  },
  computed: {
    services() {
      return this.tool.services;
    },
    categories() {
      return this.services[0].features.map((feat) => feat.name);
    },
    questions() {
      return this.tool.questions;
    },
    matchingServices() {
      return this.services.map((service) => {
        return service.features.every((feature) => {
          return this.answers.every((answer, i) => {
            const category = this.questions[i].affected_category;
            return category === feature.name
              ? answer.category_classes.includes(feature.class)
              : true;
          });
        });
      });
    },
    comparisonServices() {
      return this.services.filter((_, i) => this.selectedServices[i]);
    },
  },
  watch: {
    matchingServices() {
      // if the eligible services update, reset any selections
      this.selectedServices = [...this.matchingServices];
    },
  },
  mounted() {
    this.selectedServices = [...this.matchingServices];
  },
  methods: {
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
    recordService({ id }) {
      // copy and set due to vue mutation limitatinos
      const newSelectedServices = [...this.selectedServices];
      newSelectedServices[id] = !newSelectedServices[id];
      this.selectedServices = newSelectedServices;
    },
    resetQuestion({ id }) {
      const question = this.questions[id];
      const answer = question.answers.find(
        (a) => a.answer === question.default_answer
      );
      this.updateAnswer({ answer, id });
    },
    resetAll() {
      this.answers = this.tool.questions.map((q) =>
        q.answers.find((answer) => answer.answer === q.default_answer)
      );
      this.selectedServices = [...this.matchingServices];
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

.storage-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    max-width: 80ch;
    font-size: 1.6rem;
  }
}
</style>
