<template>
  <div>
    <DBanner
      v-if="statusAll.open_issues > 0"
      variant="danger"
      accent="warning"
      :text="'Service Disrruption: ' + statusAll.disrrupted.join(', ')"
    >
      <template #badge>
        <a href="https://status.ccv.brown.edu">CCV Status</a>
      </template>
    </DBanner>
    <DBanner
      v-for="(banner, i) in banners"
      :key="'banner' + i"
      :text="banner.tagDescription"
      variant="dark"
      accent="primary"
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
  </div>
</template>
<script>
import { DBanner } from '@brown-ccv/disco-vue-components';
import { mapState } from 'vuex';
import Navbar from '@/components/base/Navbar.vue';

export default {
  components: { Navbar, DBanner },
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
  }
};
</script>
