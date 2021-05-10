<template>
  <div class="service-selection">
    <div
      v-for="(s, i) in data"
      :id="'field' + s.service + i"
      :key="'field' + s.service + i"
      class="field service-box"
      :class="[
        selectedData.includes(s.service)
          ? 'has-background-success'
          : 'has-background-light'
      ]"
    >
      <button
        class="button-nostyle fa-checkbox"
        type="button"
        @click="change(s.service)"
      >
        <span v-if="selectedData.includes(s.service)" class="icon is-size-2"
          ><i class="fas fa-check-square"
        /></span>
        <span v-else class="icon is-size-2"><i class="far fa-square"/></span>
      </button>
      <button class="button-nostyle service-label" @click="toggleShowModal(s)">
        <span
          >{{ s.service | humanize }}
          <span class="icon"><i class="far fa-info-circle"/></span>
        </span>
      </button>
    </div>
    <DModal
      v-if="showModal"
      variant="white"
      accent="info"
      width="large"
      close-options="both"
      close-button-text="Dismiss"
      @close="showModal = !showModal"
    >
      <template #content>
        <div class="content">
          <h2 class="title">{{ modalData.service | humanize }}</h2>
          <p v-html="$md.render(modalData.description || '')"></p>
        </div>
      </template>
    </DModal>
  </div>
</template>

<script>
import DModal from '@/components/base/DModal';

export default {
  components: {
    DModal
  },
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
      selected: [],
      showModal: false,
      modalData: ''
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
    },
    toggleShowModal(data) {
      this.modalData = data;
      this.showModal = true;
    }
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/helpers/spacing';
.service-selection {
  display: flex;
  flex-basis: 30%;
  flex-wrap: wrap;
  align-content: flex-start;
}
.service-box {
  @extend .my-1;
  @extend .px-4;
  @extend .py-4;
  width: 100%;
  border-radius: 0;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.service-label {
  font-weight: bold;
  font-size: 1.1rem;
}
.fa-checkbox {
  align-self: flex-end;
}
.button-nostyle {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-link);
  &:hover {
    color: var(--color-dark);
  }
}
</style>
