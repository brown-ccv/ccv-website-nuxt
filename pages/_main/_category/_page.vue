<template>
  <div>
    <DHero
      variant="primary"
      :title="$route.params.page | humanize"
      :subtitle="$route.params.category | humanize"
    >
    </DHero>
    <main class="content-wrapper">
      <v-runtime-template
        class="content content-section"
        :template="data.body"
      />
    </main>
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
  filters: {
    humanize(str) {
      const cleanStr = str.split('-');
      const upperFirst = cleanStr.map(
        (str) => str.charAt(0).toUpperCase() + str.slice(1)
      );
      return upperFirst.join(' ');
    }
  },
  async fetch({ store, params, error }) {
    if (store.state.content.data === null) {
      await store.dispatch('content/fetchData', {
        main: params.main,
        category: params.category
      });
    }
    await store.dispatch('content/setSingle', params.page);
  },
  computed: {
    ...mapState({
      data: (state) => state.content.single
    })
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/helpers/spacing';
@import '~bulma/sass/helpers/visibility';
@import '~bulma/sass/helpers/typography';
.content-wrapper {
  @extend .mt-6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
