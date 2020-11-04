<template>
  <div>
    <span class="question-header mb-3">
      <h2>{{ data.question }}</h2>
      <DButton
        type="button"
        name="clear"
        size="small"
        variant="light"
        class="ml-2"
        @click="clear(data.affected_category)"
      >
        <template v-slot:icon-right>
          <span class="icon">
            <DIcon class="small-icon" name="redo" family="light" />
          </span>
        </template>
      </DButton>
    </span>
    <div
      v-for="(a, i) in data.answers"
      :id="urlize(data.question) + i"
      :key="urlize(data.question) + i"
      class="field"
    >
      <input
        :id="'radioinput-' + urlize(data.question) + i"
        v-model="selected"
        class="is-checkradio"
        type="radio"
        :name="'radioinput-' + urlize(data.question) + i"
        checked="checked"
        :value="[data.affected_category, a.category_classes]"
        @change="change"
      />
      <label :for="'radioinput-' + urlize(data.question) + i">{{
        a.answer
      }}</label>
    </div>
  </div>
</template>

<script>
import { DButton, DIcon } from '@brown-ccv/disco-vue-components';

export default {
  components: {
    DButton,
    DIcon
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selected: null
    };
  },
  methods: {
    change() {
      return this.$emit('answer', this.selected);
    },
    urlize(str) {
      return str
        .replace(/ /g, '-')
        .replace('?', '')
        .toLowerCase();
    },
    clear(cat) {
      this.$emit('clear', cat);
      this.selected = null;
    }
  }
};
</script>

<style lang="scss">
@import '~bulma-checkradio';
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
</style>
