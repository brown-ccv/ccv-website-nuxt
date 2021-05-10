<template>
  <main class="card-container-wrapper">
    <div class="card-container">
      <DCard
        v-for="(item, i) in filteredData"
        :key="'help-card-' + i"
        class="help-card"
        variant="light"
        accent="warning"
        width="large"
      >
        <template #header>
          <div class="px-5">
            <span
              class="icon is-size-1 has-text-success mb-5"
              :aria-label="'icon of' + item.fa.icon"
            >
              <i :class="[item.fa.prefix, `fa-${item.fa.icon}`]" />
            </span>

            <h2 class="title has-text-black">
              {{ item.title }}
            </h2>
          </div>
        </template>
        <template #content>
          <p class="card-p">{{ item.description }}</p>
        </template>
        <template #footer>
          <a
            v-for="link in item.links"
            :key="link.text"
            class="d-button is-dark has-text-light mx-5 mb-5"
            :href="link.target"
          >
            {{ link.text.toUpperCase() }}
            <span class="icon ml-2">
              <i class="fas fa-caret-right" />
            </span>
          </a>
        </template>
      </DCard>
    </div>
  </main>
</template>

<script>
import DCard from '@/components/base/DCard';

export default {
  components: {
    DCard
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredData() {
      return this.data.filter((d) => !d.hidden);
    }
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/helpers/spacing';
@import '~bulma/sass/helpers/visibility';
@import '~bulma/sass/helpers/typography';

.card-container-wrapper {
  @extend .is-flex;
  justify-content: center;
}
.card-container {
  @extend .is-flex;
  @extend .mt-6;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 160ch;
}
.card-p {
  @extend .mt-4;
  font-size: $size-5;
}
.help-card {
  @extend .my-5;
}
.help-card h2 {
  font-weight: bold;
}
</style>
