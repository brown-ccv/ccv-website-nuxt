<template>
  <div>
    <client-only>
      <DBanner
        v-if="statusAll && statusAll.open_issues > 0"
        variant="danger"
        accent="warning"
        :text="'Service Disruption: ' + statusAll.disrrupted.join(', ')"
      >
        <template #badge>
          <a href="https://status.ccv.brown.edu">CCV Status</a>
        </template>
      </DBanner>
    </client-only>
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
              page: banner.title.toLowerCase(),
            },
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
import Navbar from '@/components/base/Navbar.vue';

export default {
  components: {
    Navbar,
    DBanner: () => import('@/components/base/DBanner.vue'),
  },
  data() {
    return {
      banners: [],
      status: [],
    };
  },
  async fetch() {
    this.banners = await this.$content('home', 'banners').fetch();
    const res = await fetch('/_ghapi/status');
    this.status = await res.json();
  },
  // call fetch only on client-side
  fetchOnServer: false,
  computed: {
    statusAll() {
      return this.status.filter((a) => a.name === 'all')[0];
    },
  },
};
</script>
