<template>
  <div class="">
    <DHero
      variant="primary"
      :title="index.title"
      :subtitle="index.description"
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
import DButton from '@/components/disco-vue-components/d-button';
import DHero from '@/components/disco-vue-components/d-hero';

export default {
  components: { DHero, DButton },
  async asyncData({ $content }) {
    const index = await $content('home/index').fetch();

    return {
      index
    };
  }
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
