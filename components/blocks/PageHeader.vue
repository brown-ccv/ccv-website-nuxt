<template>
  <div>
    <DBanner
      v-if="statusAll && statusAll.open_issues > 0"
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
import { mapState } from 'vuex';

import { DBanner } from '@brown-ccv/disco-vue-components';
import Navbar from '@/components/base/Navbar.vue';

export default {
  components: { Navbar, DBanner },
  computed: {
    ...mapState(['banners', 'status']),
    statusAll() {
      return this.status.filter((a) => a.name === 'all')[0];
    }
  }
};
</script>
