<template>
  <div class="">
    <DHero
      variant="primary"
      title="Center for Computation & Visualization"
      subtitle="Scientific and technical computing expertise to advance computational research"
      class="is-fullheight"
    >
      <template #button>
        <DButton
          name="Learn about CCV's services"
          variant="dark"
          size="medium"
        />
      </template>
    </DHero>
  </div>
</template>

<script>
import { DHero, DButton } from '@brown-ccv/disco-vue-components';

export default {
  components: { DHero, DButton }
  //   async asyncData({ $content }) {
  //     const index = await $content('home/index').fetch();

  //     return {
  //       index
  //     };
  //   }
  //   Status banner
  //   head() {
  //     return {
  //       title: this.index.title,
  //       meta: [
  //         {
  //           hid: 'description',
  //           name: 'description',
  //           content: this.index.title
  //         }
  //       ]
  //     };
  //   }
};
</script>
