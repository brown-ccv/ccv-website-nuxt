<template>
  <div class="service-selection">
    <div
      v-for="(s, i) in services"
      :id="'field' + s.service + i"
      :key="'field' + s.service + i"
      class="field service-box my-1 p-4"
      :class="[
        matchingServices[i] ? 'has-background-info' : 'has-background-light',
      ]"
    >
      <button
        class="button-nostyle"
        type="button"
        :disabled="!matchingServices[i]"
        @click="change(i)"
      >
        <span class="icon is-size-2"
          ><i
            :class="[
              'mdi',
              selectedServices[i] ||
              (selectedServices[i] === null && matchingServices[i])
                ? 'mdi-checkbox-marked'
                : matchingServices[i]
                ? 'mdi-checkbox-blank'
                : 'mdi-checkbox-blank-off',
            ]"
        /></span>
      </button>
      <button class="button-nostyle service-label" @click="toggleShowModal(s)">
        <span
          >{{ s.service | humanize }}
          <span class="icon"><i class="mdi mdi-information" /></span>
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
          <h2 class="title">
            {{ modalData.service | humanize }}
          </h2>
          <p v-html="$md.render(modalData.description || '')" />
        </div>
      </template>
    </DModal>
  </div>
</template>

<script>
import DModal from '@/components/base/DModal.vue';

export default {
  components: {
    DModal,
  },
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/_/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    },
  },
  props: {
    services: {
      type: Array,
      required: true,
    },
    selectedServices: {
      type: Array,
      required: true,
    },
    matchingServices: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      modalData: '',
    };
  },
  methods: {
    change(id) {
      this.$emit('service', { id });
    },
    toggleShowModal(data) {
      // TODO: modal isn't taking whole page, but rather inserting in place
      this.modalData = data;
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.service-selection {
  display: flex;
  flex-basis: 30%;
  flex-wrap: wrap;
  align-content: flex-start;
}
.service-box {
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
</style>
