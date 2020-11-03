<template>
  <div>
    <h2 class="subtitle">{{ data.question }}</h2>
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
export default {
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
    }
  }
};
</script>

<style lang="scss">
@import '~bulma-checkradio';
</style>
