<template>
  <div>
    <DBanner text="test" />
    <v-runtime-template :template="service.body"></v-runtime-template>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // <--- To map event
import VRuntimeTemplate from 'v-runtime-template';
import * as disco from '@brown-ccv/disco-vue-components';

export default {
  components: {
    VRuntimeTemplate,
    ...disco
  },
  async fetch({ store, params, error }) {
    await store.dispatch('services/setService', params.page);
  },
  computed: {
    ...mapState({
      service: (state) => state.services.service
    })
  }
};
</script>

<style lang="scss" scoped></style>
