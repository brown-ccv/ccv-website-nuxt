<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div
      class="
        card-container
        is-flex
        mt-6
        is-justify-content-space-evenly is-flex-wrap-wrap
      "
    >
      <DCard
        v-for="(item, i) in filteredData"
        :key="'help-card-' + i"
        class="help-card my-5"
        variant="light"
        accent="warning"
        width="large"
      >
        <template #header>
          <div class="px-5">
            <span
              class="icon is-size-1 has-text-success mb-5"
              :aria-label="'icon of ' + item.mdi.icon"
            >
              <i :class="[item.mdi.prefix, `mdi-${item.mdi.icon}`]" />
            </span>

            <h2 class="title has-text-black">
              {{ item.title }}
            </h2>
          </div>
        </template>
        <template #content>
          <p class="card-p is-size-5 mt-4">{{ item.description }}</p>
        </template>
        <template #footer>
          <div v-for="link in item.links" :key="link.text">
            <a
              v-if="link.target.startsWith('http')"
              :href="link.target"
              class="d-button is-dark has-text-light mx-5 mb-5"
            >
              {{ link.text.toUpperCase() }}
              <span class="icon ml-2">
                <i class="mdi mdi-menu-rightt" />
              </span>
            </a>
            <nuxt-link
              v-else
              :to="link.target"
              class="d-button is-dark has-text-light mx-5 mb-5"
            >
              {{ link.text.toUpperCase() }}
              <span class="icon ml-2">
                <i class="mdi mdi-menu-right" />
              </span>
            </nuxt-link>
          </div>
        </template>
      </DCard>
    </div>
  </main>
</template>

<script>
import DCard from '@/components/base/DCard.vue';

export default {
  components: {
    DCard,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filteredData() {
      return this.data.filter((d) => !d.hidden);
    },
  },
};
</script>

<!-- see assets/scss/_layout.scss for relevant styles -->
<style lang="scss" scoped>
.card-container {
  width: 160ch;
}
.help-card h2 {
  font-weight: bold;
}
</style>
