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
    <DBanner
      v-for="(banner, i) in banners"
      :key="'banner' + i"
      :text="banner.tagDescription"
      :variant="variants[Math.floor(Math.random() * variants.length)]"
      :accent="variants[Math.floor(Math.random() * variants.length)]"
    >
      <template #badge>
        <nuxt-link
          :to="{
            name: 'main-category-page',
            params: {
              main: 'home',
              category: 'banners',
              page: banner.title.toLowerCase()
            }
          }"
        >
          {{ banner.title }}
        </nuxt-link>
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
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  components: { Navbar, Footer, DBanner },
  data() {
    return {
      variants: [
        'warning',
        'link',
        'primary',
        'success',
        'dark',
        'light',
        'info'
      ]
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.status.data,
      banners: (state) => state.banners.data
    }),
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
