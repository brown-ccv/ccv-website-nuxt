<template>
  <div>
    <PageHeader />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/base/Footer.vue';
import PageHeader from '@/components/base/PageHeader.vue';

export default {
  components: {
    PageHeader,
    Footer,
  },
  head: {
    titleTemplate: 'Center for Computation and Visualization | %s', // <-- title template
    meta: [
      {
        hid: 'description',
        name: 'description', // <-- moved this over from index.vue
        content: 'Brown CCV',
      },
    ],
  },
};
</script>
