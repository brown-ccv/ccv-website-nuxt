<template>
  <div>
    <span class="question-header mb-1">
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
    <details class="question-details mb-4">
      <summary>
        <fa class="info-icon" :icon="['fas', 'info-circle']" />
      </summary>
      <p v-html="$md.render(data.information || '')"></p>
    </details>
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
      selected: null,
      showModal: false
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
@import '~bulma/sass/utilities/_all';
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
.info-icon {
  color: var(--color-success);
  &:hover {
    color: var(--color-dark);
  }
}
</style>
