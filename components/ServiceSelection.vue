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
          :icon="['fas', 'check-square']"
          size="3x"
        />
        <fa v-else :icon="['far', 'square']" size="3x" />
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
  watch: {
    selectedData: {
      deep: true,
      handler(newVal) {
        if (newVal.length === 0) {
          this.selected = [];
        }
      }
    }
  },
  methods: {
    change(service) {
      if (this.selected.includes(service)) {
        this.selected = this.selected.filter((s) => s !== service);
      } else {
        this.selected.push(service);
      }
      this.$emit('service', this.selected);
    }
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/helpers/spacing';
.service-box {
  @extend .my-3;
  @extend .mx-3;
  @extend .px-4;
  @extend .py-4;
  box-shadow: 2px 4px 10px var(--color-grey-lighter);
  height: 10rem;
  border-radius: 0;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
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
