<template>
  <div class="px-2">
    <span class="question-header mb-1">
      <h2>{{ question.question }}</h2>
      <DButton
        type="button"
        name="reset"
        size="small"
        variant="light"
        class="ml-2"
        @click="reset()"
      >
        <template #icon-right>
          <span class="icon">
            <i class="mdi mdi-redo-variant" />
          </span>
        </template>
      </DButton>
    </span>
    <details v-if="question.information" class="question-details mb-4">
      <summary>
        <span class="icon has-text-info is-medium">
          <i class="mdi mdi-information-outline mdi-24px" />
        </span>
      </summary>
      <div class="content" v-html="$md.render(question.information)"></div>
    </details>
    <div
      v-for="(a, i) in question.answers"
      :id="urlize(question.question) + i"
      :key="urlize(question.question) + i"
      class="field mb-1"
    >
      <input
        :id="'radioinput-' + urlize(question.question) + i"
        class="is-checkradio"
        type="radio"
        :name="'radioinput-' + urlize(question.question)"
        :value="a"
        :checked="selected === a"
        @input="change(a)"
      />
      <label :for="'radioinput-' + urlize(question.question) + i">{{
        a.answer
      }}</label>
    </div>
  </div>
</template>

<script>
import DButton from '@/components/base/DButton.vue';

export default {
  components: {
    DButton,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
    selected: {
      type: Object,
      required: true,
    },
    questionId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    change(answer) {
      return this.$emit('answer', { answer, id: this.questionId });
    },
    urlize(str) {
      return str.replace(/ /g, '-').replace('?', '').toLowerCase();
    },
    reset() {
      return this.$emit('reset', { id: this.questionId });
    },
  },
};
</script>

<style lang="scss" scoped>
.question-header {
  display: flex;
  align-content: center;
  align-items: center;
  h2 {
    height: 100%;
    font-weight: bold;
    font-size: 1.2rem;
  }
}
.small-icon {
  font-size: 0.5rem;
}
.question-details {
  cursor: pointer;
  max-width: 50ch;
}
</style>
