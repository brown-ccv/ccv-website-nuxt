<template>
  <div class="content">
    <v-runtime-template :template="data.body" />
    <div v-if="data.description">
      {{ data.description }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VRuntimeTemplate from 'v-runtime-template';
import * as disco from '@brown-ccv/disco-vue-components';

export default {
  components: {
    VRuntimeTemplate,
    ...disco
  },
  async fetch({ store, params, error }) {
    await store.dispatch('content/setSingle', params.page);
  },
  computed: {
    ...mapState({
      data: (state) => state.content.single
    })
  }
};
</script>

<style lang="scss" scoped></style>
