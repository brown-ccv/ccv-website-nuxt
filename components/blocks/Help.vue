<template>
  <div class="card-container">
    <DCard
      v-for="(item, i) in data"
      :key="'help-card-' + i"
      class="help-card"
      variant="light"
      accent="warning"
      :title="item.title"
    >
      <template #content>
        <fa
          size="2x"
          :icon="[item.fa.prefix, item.fa.icon]"
          :aria-label="'icon of' + item.fa.icon"
        />
        <p class="card-p">{{ item.description }}</p>
      </template>
      <template #footer>
        <a
          v-for="link in item.links"
          :key="link.text"
          class="d-button is-dark has-text-light mx-2"
          :href="link.target"
          >{{ link.text }}</a
        >
      </template>
    </DCard>
  </div>
</template>

<script>
import { DCard } from '@brown-ccv/disco-vue-components';

export default {
  components: {
    DCard
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/helpers/spacing';
@import '~bulma/sass/helpers/visibility';
@import '~bulma/sass/helpers/typography';

.card-container {
  @extend .is-flex;
  @extend .mt-6;
  justify-content: space-evenly;
  flex-wrap: wrap;
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
