<template>
  <div>
    <span class="question-header mb-1">
      <h2>{{ data.question }}</h2>
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
    <details v-if="data.information" class="question-details mb-4">
      <summary>
        <span class="icon has-text-info">
          <i class="mdi mdi-information-outline" />
        </span>
      </summary>
      <p class="content" v-html="$md.render(data.information)"></p>
    </details>
    <div
      v-for="(a, i) in data.answers"
      :id="urlize(data.question) + i"
      :key="urlize(data.question) + i"
      class="field"
    >
      <input
        :id="'radioinput-' + urlize(data.question) + i"
        class="is-checkradio"
        type="radio"
        :name="'radioinput-' + urlize(data.question)"
        :value="a"
        :checked="selected === a"
        @input="change(a)"
      />
      <label :for="'radioinput-' + urlize(data.question) + i">{{
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
    data: {
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
  width: 50ch;
}
</style>
