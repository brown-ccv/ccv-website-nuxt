<template>
  <div class="service-selection">
    <button
      v-for="(s, i) in data"
      :id="'field' + s.service + i"
      :key="'field' + s.service + i"
      class="field service-box"
      :class="[
        selectedData.includes(s.service)
          ? 'has-background-success'
          : 'has-background-light'
      ]"
      type="button"
      @click="change(s.service)"
    >
      <div class="fa-checkbox">
        <fa
          v-if="selectedData.includes(s.service)"
          :icon="['fal', 'check-square']"
          size="2x"
        />
        <fa v-else :icon="['fal', 'square']" size="2x" />
      </div>
      <p class="service-label">{{ s.service | humanize }}</p>
    </button>
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
    change(service) {
      if (this.selected.includes(service)) {
        this.selected.pop(service);
      } else {
        this.selected.push(service);
      }
      this.$emit('service', this.selected);
    }
  }
};
</script>

<style lang="scss">
@import 'bulma';
.service-box {
  @extend .box;
  @extend .my-3;
  @extend .mx-3;
  height: 10rem;
  border-radius: 0;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.service-label {
  width: 12ch;
  font-weight: bold;
  font-size: 1.1rem;
}
.fa-checkbox {
  align-self: flex-end;
}
</style>
