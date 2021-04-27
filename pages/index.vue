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
import DButton from '@/components/base/DButton';
import DHero from '@/components/base/DHero';

export default {
  components: { DHero, DButton },
  asyncData({ params }) {
    console.log(`pages/index.vue: ${params}`);
  }
};
</script>
