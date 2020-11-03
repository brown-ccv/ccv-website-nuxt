<template>
  <div class="service-selection">
    <div
      v-for="(s, i) in data"
      :id="'field' + s.service + i"
      :key="'field' + s.service + i"
      class="field service-box"
    >
      <input
        :id="'checkbox-' + s.service + i"
        v-model="selected"
        class="is-checkradio"
        type="checkbox"
        :name="'checkbox-' + s.service + i"
        :value="s.service"
        @change="change"
      />
      <label :for="'checkbox-' + s.service + i">{{
        s.service | humanize
      }}</label>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/_/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    selectedData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: []
    };
  },
  methods: {
    change() {
      this.$emit('service', this.selected);
      this.$emit('resetQuestions', true);
    }
  }
};
</script>

<style lang="scss"></style>
