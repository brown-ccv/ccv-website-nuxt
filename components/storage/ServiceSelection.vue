<template>
  <div class="service-selection px-2">
    <div
      v-for="(s, i) in services"
      :id="'field' + s.name + i"
      :key="'field' + s.name + i"
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
      <p class="is-size-5 has-text-bold">{{ humanize(s.name) }}</p>
      <span class="icon is-clickable" @click="toggleShowModal(s)"
        ><i class="mdi mdi-information"
      /></span>
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
            {{ humanize(modalData.service) }}
          </h2>
          <p v-html="$md.render(modalData.description || '')" />
        </div>
      </template>
    </DModal>
  </div>
</template>

<script>
import DModal from '@/components/base/DModal.vue';
import { humanize } from '@/utils';

export default {
  components: {
    DModal,
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
      this.modalData = data;
      this.showModal = true;
    },
    humanize
  },
};
</script>

<style lang="scss" scoped>
.service-selection {
  display: flex;
  flex-basis: 30%;
  flex-wrap: wrap;
  flex-grow: 2;
  align-content: flex-start;
  max-width: 500px;
  @include mobile {
    width: 100%;
  }
}
.service-box {
  width: 100%;
  border-radius: 0;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
}
.service-label {
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
