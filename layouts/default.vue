<template>
  <div>
    <DBanner
      v-if="statusAll.open_issues > 0"
      variant="danger"
      accent="warning"
      :text="'Service Disrruption: ' + statusAll.disrrupted.join(', ')"
    >
      <template #badge>
        <a href="https://status.ccv.brown.edu"
          >Check CCV Status for more information</a
        >
      </template>
    </DBanner>
    <Navbar />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import { DBanner } from '@brown-ccv/disco-vue-components';
import { mapState } from 'vuex';
import Navbar from '@/components/base/Navbar.vue';
import Footer from '@/components/base/Footer.vue';

export default {
  components: { Navbar, Footer, DBanner },
  computed: {
    ...mapState({ data: (state) => state.status.data }),
    statusAll() {
      return this.data.filter((a) => a.name === 'all')[0];
    }
  },
  head: {
    titleTemplate: 'Center for Computation and Visualization | %s', // <-- title template
    meta: [
      {
        hid: 'description',
        name: 'description', // <-- moved this over from index.vue
        content: 'Brown CCV'
      }
    ]
  }
};
</script>
